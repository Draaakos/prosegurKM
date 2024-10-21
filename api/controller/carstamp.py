import json
from django.http import JsonResponse
from django.views import View
from api.models import CarStamp
from api.forms import CarStampForm


class CarStampView(View):
    def post(self, request):
        data = json.loads(request.body)
        print('data', data)

        # form = CarStampForm(request.POST)
        # if form.is_valid():
        #     print('form valido')
        # if form.is_valid():
        #     car = form.save()
        #     return JsonResponse({'message': 'Car created successfully!', 'car_id': car.id}, status=201)
        # return JsonResponse({'errors': form.errors}, status=400)
        pass

    def put(self, request, car_id):
        # data = json.loads(request.body)

        # car = Car.objects.get(pk=car_id)
        # car.mileage = data['mileage']
        # car.mileage_preventive = data['mileage_preventive']

        # if 'serviceId' in data:
        #     car.service_id = int(data['serviceId'])

        # car.save()

        # return JsonResponse({ 'message': 'Car updated' })
        pass

    def delete(self, request, car_id):
        # car = get_object_or_404(Car, id=car_id)
        # car.delete()
        # return JsonResponse({'message': 'Car deleted successfully!'}, status=204)
        pass
