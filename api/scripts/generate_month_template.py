import calendar
from datetime import datetime, timedelta

from api.models import CarKilometerLog
from api.models import Car

def generate_kilometer_logs_for_current_month(car):
    now = datetime.now()
    year = now.year
    month = now.month

    num_days = calendar.monthrange(year, month)[1]

    for day in range(1, num_days + 1):
        mileage_date = datetime(year, month, day)
        car_kilometer_log = CarKilometerLog()
        car_kilometer_log.car = car
        car_kilometer_log.mileage_date = mileage_date
        car_kilometer_log.mileage = 0
        car_kilometer_log.save()



def run():
    for car in Car.objects.all():
        generate_kilometer_logs_for_current_month(car)
