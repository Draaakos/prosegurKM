from django.http import JsonResponse
from api.models import Service, DocumentType


def fetch_car_service_list(request):
    services = list(Service.objects.values())
    return JsonResponse({ 'services': services }, safe=False )



def fetch_document_type_list(request):
    types = list(DocumentType.objects.values())
    return JsonResponse({ 'types': types }, safe=False )
