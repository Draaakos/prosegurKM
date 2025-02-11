from datetime import datetime
from django.db.models import Q
from django.db import models
from .tools import define_product_path


class Account(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class CarType(models.Model):
    name = models.CharField(max_length=30)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.name}'


class Stamp(models.Model):
    name = models.CharField(max_length=100)
    color = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def to_json(self):
        return {
            'id': self.id,
            'name': self.name,
            'color': self.color
        }


class Service(models.Model):
    name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def to_json(self):
        return {
            'id': self.id,
            'name': self.name
        }



class DocumentType(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return f'{self.name}'

    def to_json(self):
        return {
            'id': self.id,
            'name': self.name
        }



class Document(models.Model):
    upload = models.FileField(upload_to=define_product_path)
    expired_date = models.DateTimeField()
    has_expired = models.BooleanField(default=False)
    document_type = models.ForeignKey(DocumentType, on_delete=models.CASCADE, null=False, blank=False)

    def __str__(self):
        return self.document_type.name

    def to_json(self, is_expired):
        return {
            'id': self.id,
            'name': self.document_type.name,
            'path': f'/media/{self.upload.name}',
            'expiredDate': self.expired_date.strftime("%d-%m-%Y"),
            'hasExpired': self.has_expired,
            'isExpired': is_expired
        }


class Car(models.Model):
    ppu = models.CharField(max_length=100)
    car_type = models.ForeignKey(CarType, on_delete=models.CASCADE, null=False, blank=False)
    mileage = models.FloatField()
    mileage_preventive_limit = models.FloatField()
    mileage_preventive_notification = models.FloatField(default=5000)
    extinguisher = models.DateTimeField(auto_now=True)
    service = models.ForeignKey(Service, on_delete=models.CASCADE, null=False, blank=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)

    def get_days_for_current_month_and_car(self):
        last_day_updated = self.get_last_day_updated_idx(self.id)

        now = datetime.now()
        year = now.year
        month = now.month

        days = CarKilometerLog.objects.filter(
            car=self,
            mileage_date__year=year,
            mileage_date__month=month
        )

        days_processed = []
        for day in days:
            is_editable = True
            if last_day_updated is not None:
                print('last_day_updated', last_day_updated)
                print('day', day.mileage_date)
                is_editable = last_day_updated <= day.mileage_date

            days_processed.append(day.to_json(is_editable))
        return days_processed


    def get_last_day_updated_idx(self, car_id):
        days_am = CarKilometerLog.objects.filter(car=car_id).filter(mileage_am__gt=0).order_by('-mileage_date')
        days_pm = CarKilometerLog.objects.filter(car=car_id).filter(mileage_pm__gt=0).order_by('-mileage_date')

        if len(days_pm) > 0:
            return days_pm[0].mileage_date
        elif len(days_am) > 0:
            return days_am[0].mileage_date
        else:
            return None

        if days_am.exists():
            return days_am[0].mileage_date
        elif days_pm.exists():
            return days_pm[0].mileage_date
        else:
            return None


    def to_json(self):
        return {
            'id': self.id,
            'ppu': self.ppu,
            'type': self.car_type.name,
            'mileage': self.mileage,
            'mileage_preventive_limit': self.mileage_preventive_limit,
            'mileage_preventive_notification': self.mileage_preventive_notification,
            'service': self.service.name,
            'service_id': self.service.id,
            'days': self.get_days_for_current_month_and_car()
        }


class CarDocument(models.Model):
    document = models.ForeignKey(Document, on_delete=models.CASCADE, null=False, blank=False)
    car = models.ForeignKey(Car, on_delete=models.CASCADE, null=False, blank=False)
    is_active = models.BooleanField(default=True)


class CarKilometerLog(models.Model):
    car = models.ForeignKey(Car, on_delete=models.CASCADE, null=False, blank=False)
    prev_mileage_am = models.FloatField()
    prev_mileage_pm = models.FloatField()
    mileage_am = models.FloatField()
    mileage_pm = models.FloatField()
    mileage_date = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    last_edition_by = models.ForeignKey(Account, on_delete=models.CASCADE, null=True, blank=True)


    def to_json(self, is_editable = True):
        return {
            'id': self.id,
            'prev_mileage_am': self.prev_mileage_am,
            'prev_mileage_pm': self.prev_mileage_pm,
            'mileage_am': self.mileage_am,
            'mileage_pm': self.mileage_pm,
            'date': self.mileage_date,
            'dateFormmatted': self.mileage_date.strftime('%d-%m-%Y'),
            'is_editable': is_editable,
            'last_edition_by': self.last_edition_by.name if self.last_edition_by is not None else None
        }


class CarStamp(models.Model):
    stamp = models.ForeignKey(Stamp, on_delete=models.CASCADE, null=False, blank=False)
    car = models.ForeignKey(Car, on_delete=models.CASCADE, null=False, blank=False)
    expired_date = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def to_json(self, is_expired = False):
        stamp = self.stamp.to_json()

        return {
            'car_stamp_id': self.id,
            'stamp_id': stamp['id'],
            'color': stamp['color'],
            'name': stamp['name'],
            'is_expired': is_expired,
            'expired_date': self.expired_date.strftime('%d-%m-%Y')
        }


class NotificationLog(models.Model):
    ppu = models.CharField(max_length=100)
    notification_type = models.CharField(max_length=100)
    was_checked = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    @property
    def to_json(self):
        return {
            'ppu': self.ppu,
            'type': self.notification_type,
            'date': self.created_at.strftime('%d/%m/%Y %H:%M') if self.created_at else None
        }
