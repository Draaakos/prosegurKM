from django.views import View
from django.http import JsonResponse
from api.models import CarKilometerLog


class LogsMonthCarView(View):
    def get(self, request, year, month, car_id):
        print(year, month, car_id)
        return JsonResponse({'days': self.get_days(year, month, car_id)})

    def get_days(self, year, month, car):
        days = CarKilometerLog.objects.filter(
            car=car,
            mileage_date__year=year,
            mileage_date__month=month
        )

        return [ day.to_json() for day in days ]
