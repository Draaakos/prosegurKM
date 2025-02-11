import os
import json
import calendar
import hmac, hashlib
import codecs
from threading import Thread
from datetime import datetime, timedelta
from django.core.mail import EmailMultiAlternatives
from api.models import CarKilometerLog
from api.models import Car


class EmailSender(Thread):
    def __init__(self, destination='', source='', subject='', content=''):
        Thread.__init__(self)
        self.destination = destination
        self.source = source
        self.content = content
        self.subject = subject

    def send(self):
        self.start()

    def run(self):
        try:
            email = EmailMultiAlternatives(
                self.subject,
                self.content,
                self.source,
                [self.destination]
            )

            email.attach_alternative(self.content, 'text/html')
            email.send()
        except AttributeError:
            pass



def generate_kilometer_logs_for_current_month(car_id, year, month):
    num_days = calendar.monthrange(year, month)[1]

    for day in range(1, num_days + 1):
        mileage_date = datetime(year, month, day)
        car_kilometer_log = CarKilometerLog()
        car_kilometer_log.car_id = car_id
        car_kilometer_log.mileage_date = mileage_date
        car_kilometer_log.prev_mileage_am = 0
        car_kilometer_log.prev_mileage_pm = 0
        car_kilometer_log.mileage_pm = 0
        car_kilometer_log.mileage_am = 0
        car_kilometer_log.last_edition_by = None
        car_kilometer_log.save()



# def get_last_day_updated_idx(self, car_id):
#     days_am = CarKilometerLog.objects.filter(car=car_id).filter(mileage_am__gt=0).order_by('-mileage_date')
#     days_pm = CarKilometerLog.objects.filter(car=car_id).filter(mileage_pm__gt=0).order_by('-mileage_date')

#     if days_am.exists():
#         return days_am[0].mileage_date
#     elif days_pm.exists():
#         return days_pm[0].mileage_date
#     else:
#         return None
