import json
from ..services import generate_kilometer_logs_for_current_month
from django.http import JsonResponse
from django.views import View


class MonthController(View):
    def post(self, request):
        data = json.loads(request.body)
        car_id = data.get('car')
        year = data.get('year')
        month = data.get('month')
        generate_kilometer_logs_for_current_month(car_id, year, month)

        return JsonResponse({'message': 'Month created successfully!'}, status=201)
