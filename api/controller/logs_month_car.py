from django.views import View
from django.http import JsonResponse
from api.models import CarKilometerLog


class LogsMonthCarView(View):
    def get(self, request, year, month, car_id):
        print(year, month, car_id)
        return JsonResponse({'days': self.get_days(year, month, car_id)})

    def get_days(self, year, month, car):
        last_day_updated = self.get_last_day_updated_idx(car)

        days = CarKilometerLog.objects.filter(
            car=car,
            mileage_date__year=year,
            mileage_date__month=month
        )

        days_processed = []
        for day in days:
            is_editable = True
            if last_day_updated is not None:
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
