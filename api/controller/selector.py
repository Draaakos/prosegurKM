from django.http import JsonResponse
from api.models import Service, DocumentType, CarType


def fetch_car_service_list(request):
    services = list(Service.objects.values())
    return JsonResponse({ 'services': services }, safe=False )



def fetch_document_type_list(request):
    types = list(DocumentType.objects.values())
    return JsonResponse({ 'types': types }, safe=False )


def fetch_car_type_list(request):
    car_types = list(CarType.objects.values())
    return JsonResponse({ 'car_types': car_types }, safe=False )
