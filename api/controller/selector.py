from api.models import Service
from django.http import JsonResponse

def fetch_car_service_list(request):
    services = list(Service.objects.values())
    return JsonResponse({'services': services}, safe=False)
