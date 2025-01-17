import json
from django.shortcuts import get_object_or_404
from datetime import datetime
from django.http import JsonResponse
from django.views import View
from api.models import CarStamp
from api.controller.notification import Notification



class CarStampView(View):
    def post(self, request):
        data = json.loads(request.body)
        expired_date = datetime.strptime(data['expired_date'], "%Y/%m/%d").strftime("%Y-%m-%d")

        car_stamp = CarStamp()
        car_stamp.car_id = data['car']
        car_stamp.stamp_id = data['stamp']
        car_stamp.expired_date = expired_date
        car_stamp.save()

        notification = Notification()
        notification.send_add_stamp(car_stamp.car, car_stamp.stamp)

        return JsonResponse({ 'response': car_stamp.id })


    def delete(self, request):
        data = json.loads(request.body)
        car_stamp = get_object_or_404(CarStamp, id=data['car_stamp_id'])
        car_stamp.delete()

        notification = Notification()
        notification.send_remove_stamp(car_stamp.car, car_stamp.stamp)

        return JsonResponse({'message': 'Sello eliminado correctamente!'}, status=204)
