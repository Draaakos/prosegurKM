import json
from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from django.views import View
from api.models import Car
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
                'updated_at': car.updated_at,
            }
            return JsonResponse(data)
        else:
            cars = Car.objects.all()
            return JsonResponse([item.to_json() for item in cars], safe=False)

    def post(self, request):
        form = CarForm(request.POST)
        if form.is_valid():
            car = form.save()
            return JsonResponse({'message': 'Car created successfully!', 'car_id': car.id}, status=201)
        return JsonResponse({'errors': form.errors}, status=400)

    def put(self, request, car_id):
        data = json.loads(request.body)

        car = Car.objects.get(pk=car_id)
        car.mileage = data['mileage']
        car.save()

        return JsonResponse({ 'message': 'Car updated' })

    def delete(self, request, car_id):
        car = get_object_or_404(Car, id=car_id)
        car.delete()
        return JsonResponse({'message': 'Car deleted successfully!'}, status=204)
