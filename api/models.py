from datetime import datetime
from django.db.models import Q
from django.db import models


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


class Document(models.Model):
    name = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Stamp(models.Model):
    name = models.CharField(max_length=50)
    expired_date = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Service(models.Model):
    name = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Car(models.Model):
    ppu = models.CharField(max_length=50)
    car_type = models.ForeignKey(CarType, on_delete=models.CASCADE, null=False, blank=False)
    mileage = models.FloatField()
    mileage_limit = models.FloatField()
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
            'mileage_limit': self.mileage_limit,
            'service': self.service.name,
            'days': self.get_days_for_current_month_and_car(self)
        }


class CarKilometerLog(models.Model):
    car = models.ForeignKey(Car, on_delete=models.CASCADE, null=False, blank=False)
    mileage = models.FloatField()
    mileage_date = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def to_json(self):
        return {
            'id': self.id,
            'mileage': self.mileage,
            'date': self.mileage_date,
            'dateFormmatted': self.mileage_date.strftime('%d-%m-%Y')
        }


class CarStamp(models.Model):
    stamp = models.ForeignKey(Stamp, on_delete=models.CASCADE, null=False, blank=False)
    car = models.ForeignKey(Car, on_delete=models.CASCADE, null=False, blank=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class CarDocument(models.Model):
    document = models.ForeignKey(Document, on_delete=models.CASCADE, null=False, blank=False)
    car = models.ForeignKey(Car, on_delete=models.CASCADE, null=False, blank=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
