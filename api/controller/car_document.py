import json
from django.views import View
from django.http import JsonResponse
from api.models import Car, CarDocument, Document
from api.forms import DocumentForm
from ..tools import define_product_path

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
        car_document.delete()

        document = Document.objects.get(pk=document_id)
        document.delete()

        return JsonResponse({
            "message": "Documento eliminado correctamente",
            "status": 200
        })
















    # def handle_uploaded_file(self, f):
    #     filename = define_product_path('', f.name)
    #     path = f'media/{filename}'
    #     with open(path, 'wb+') as destination:
    #         for chunk in f.chunks():
    #             destination.write(chunk)

    #     return {
    #         'path': path,
    #         'filename': filename
    #     }


