import json
from django.views import View
from django.http import JsonResponse
from api.models import Car, CarDocument, Document
from api.forms import DocumentForm
from ..tools import define_product_path
from api.controller.notification import Notification


class CarDocumentView(View):
    def post(self, request, **kwargs):
        car_id = kwargs.get('car_id')
        form = DocumentForm(request.POST, request.FILES)

        if form.is_valid():
            document = form.save()
            car = Car.objects.get(pk=car_id)
            car_document = CarDocument()
            car_document.document = document
            car_document.car = car
            car_document.save()

            notification = Notification()
            notification.send_add_document(car)

            return JsonResponse({
                'data': document.to_json()
            })

        else:
            return JsonResponse({
                'msg': 'error'
            })

    def delete(self, request, **kwargs):
        document_id = kwargs.get('document_id')
        car_id = kwargs.get('car_id')

        car_document = CarDocument.objects.get(document_id=document_id, car_id=car_id)
        car_document.is_active = False
        car_document.save()

        notification = Notification()
        notification.send_remove_document(car_document.car)

        return JsonResponse({
            "message": "Documento eliminado correctamente",
            "status": 200
        })







