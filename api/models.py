from datetime import datetime
from django.db.models import Q
from django.db import models
from .tools import define_product_path


class Account(models.Model):
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
    name = models.CharField(max_length=50)
    color = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def to_json(self):
        return {
            'id': self.id,
            'name': self.name,
            'color': self.color
        }


class Service(models.Model):
    name = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def to_json(self):
        return {
            'id': self.id,
            'name': self.name
        }



class DocumentType(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return f'{self.name}'

    def to_json(self):
        return {
            'id': self.id,
            'name': self.name
        }



class Document(models.Model):
    upload = models.FileField(upload_to=define_product_path)
    expired_date = models.DateField()
    has_expired = models.BooleanField(default=False)
    document_type = models.ForeignKey(DocumentType, on_delete=models.CASCADE, null=False, blank=False)

    def __str__(self):
        return self.document_type.name

    def to_json(self):
        return {
            'id': self.id,
            'name': self.document_type.name,
            'path': f'/media/{self.upload.name}',
            'expiredDate': self.expired_date.strftime("%d-%m-%Y"),
            'hasExpired': self.has_expired
        }


class Car(models.Model):
    ppu = models.CharField(max_length=50)
    car_type = models.ForeignKey(CarType, on_delete=models.CASCADE, null=False, blank=False)
    mileage = models.FloatField()
    mileage_preventive_limit = models.FloatField()
    mileage_preventive_notification = models.FloatField(default=5000)
    extinguisher = models.DateTimeField(auto_now=True)
    service = models.ForeignKey(Service, on_delete=models.CASCADE, null=False, blank=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def get_days_for_current_month_and_car(self, car):
        now = datetime.now()
        year = now.year
        month = now.month

        days = CarKilometerLog.objects.filter(
            car=car,
            mileage_date__year=year,
            mileage_date__month=month
        )

        return [ day.to_json() for day in days ]

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
            'days': self.get_days_for_current_month_and_car(self)
        }


class CarDocument(models.Model):
    document = models.ForeignKey(Document, on_delete=models.CASCADE, null=False, blank=False)
    car = models.ForeignKey(Car, on_delete=models.CASCADE, null=False, blank=False)


class CarKilometerLog(models.Model):
    car = models.ForeignKey(Car, on_delete=models.CASCADE, null=False, blank=False)
    prev_mileage_am = models.FloatField()
    prev_mileage_pm = models.FloatField()
    mileage_am = models.FloatField()
    mileage_pm = models.FloatField()
    mileage_date = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def to_json(self):
        return {
            'id': self.id,
            'prev_mileage_am': self.prev_mileage_am,
            'prev_mileage_pm': self.prev_mileage_pm,
            'mileage_am': self.mileage_am,
            'mileage_pm': self.mileage_pm,
            'date': self.mileage_date,
            'dateFormmatted': self.mileage_date.strftime('%d-%m-%Y')
        }


class CarStamp(models.Model):
    stamp = models.ForeignKey(Stamp, on_delete=models.CASCADE, null=False, blank=False)
    car = models.ForeignKey(Car, on_delete=models.CASCADE, null=False, blank=False)
    expired_date = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def to_json(self):
        stamp = self.stamp.to_json()

        return {
            'car_stamp_id': self.id,
            'stamp_id': stamp['id'],
            'color': stamp['color'],
            'name': stamp['name'],
            'expired_date': self.expired_date.strftime('%d-%m-%Y')
        }


class NotificationLog(models.Model):
    ppu = models.CharField(max_length=50)
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
