import json
from datetime import datetime, timedelta
from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from django.views import View
from api.models import Car, CarStamp, CarDocument
from api.forms import CarForm


class CarView(View):
    def get(self, request, car_id=None):
        if car_id:
            car = get_object_or_404(Car, id=car_id)
            data = {
                'ppu': car.ppu,
                'car_type': car.car_type.id,
                'mileage': car.mileage,
                'mileage_limit': car.mileage_limit,
                'extinguisher': car.extinguisher,
                'service': car.service.id,
                'created_at': car.created_at,
                'updated_at': car.updated_at
            }
            return JsonResponse(data)
        else:
            days_to_expire = 25
            now_date = datetime.now() + timedelta(days=days_to_expire)

            car_list = []
            for car in Car.objects.filter(is_active=True):
                item = car.to_json()


                stamps = []
                for stamp in CarStamp.objects.filter(car__id=car.id):
                    is_expired = False

                    if stamp.expired_date.replace(tzinfo=None) < now_date:
                        is_expired = True

                    stamps.append(stamp.to_json(is_expired))

                item['stamps'] = stamps



                # item['documents'] = [
                #     car_document.document.to_json() for car_document in CarDocument.objects.filter(car__id=car.id)
                # ]

                documents = []
                for car_document in CarDocument.objects.filter(car__id=car.id, is_active=True):
                    is_expired = False

                    if car_document.document.has_expired:
                        validate_date = car_document.document.expired_date.replace(tzinfo=None)

                        if validate_date < now_date:
                            is_expired = True

                    documents.append(car_document.document.to_json(is_expired))

                item['documents'] = documents

                CarStamp.objects.filter(car__id=car.id)
                car_list.append(item)
            return JsonResponse(car_list, safe=False)


    def post(self, request):
        data = json.loads(request.body)
        form = CarForm(data)

        if form.is_valid():
            car = form.save()
            return JsonResponse({'message': 'Car created successfully!', 'car_id': car.id}, status=201)
        return JsonResponse({'errors': form.errors}, status=400)

    def put(self, request, car_id):
        data = json.loads(request.body)

        car = Car.objects.get(pk=car_id)
        car.mileage = data['mileage']
        car.mileage_preventive_limit = data['mileage_preventive_limit']
        car.mileage_preventive_notification = data['mileage_preventive_notification']

        if 'serviceId' in data:
            car.service_id = int(data['serviceId'])

        car.save()

        return JsonResponse({ 'message': 'Car updated' })

    def delete(self, request, car_id):
        car = get_object_or_404(Car, id=car_id)
        car.is_active = False
        car.save()

        return JsonResponse({'message': 'Car deleted successfully!'})
