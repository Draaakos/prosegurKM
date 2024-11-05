import json
from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from django.views import View
from api.models import CarKilometerLog
from api.forms import CarKilometerLogForm
from api.services import EmailSender
from django.conf import settings




class CarKilometerLogView(View):
    def get(self, request, car_id=None):
        if car_id:
            log = get_object_or_404(CarKilometerLog, car_id=car_id)
            data = {
                'car': log.car.id,
                'mileage': log.mileage,
                'mileage_date': log.mileage_date,
                'created_at': log.created_at,
                'updated_at': log.updated_at,
            }
            return JsonResponse(data)
        else:
            logs = CarKilometerLog.objects.all().values()
            return JsonResponse(list(logs), safe=False)

    def post(self, request):
        data = json.loads(request.body)

        form = CarKilometerLogForm(data)
        if form.is_valid():
            log = form.save()
            return JsonResponse({'message': 'Log created successfully!', 'log_id': log.id}, status=201)
        return JsonResponse({'errors': form.errors}, status=400)

    def put(self, request, log_id):
        data = json.loads(request.body)

        log = get_object_or_404(CarKilometerLog, id=log_id)
        form = CarKilometerLogForm(data, instance=log)

        # self._send_notification_email()


        if form.is_valid():
            form.save()
            return JsonResponse({'message': 'Log updated successfully!'})
        return JsonResponse({'errors': form.errors}, status=400)

    def delete(self, request, log_id):
        log = get_object_or_404(CarKilometerLog, id=log_id)
        log.delete()
        return JsonResponse({'message': 'Log deleted successfully!'}, status=204)


    def _send_notification_email(self):
        destination = 'orlando.andaur.c@gmail.com'
        source = settings.EMAIL_HOST_USER
        subject = 'test'


        content = """
            <section>
                <h2>
                    Felicidades {} pudimos validar tu compra!
                </h2>

                <table>
                    <thead>
                        <tr>
                            <td style="padding: 1em;">Nombre</td>
                            <td style="padding: 1em;">SKU</td>
                            <td style="padding: 1em;">Precio</td>
                        </tr>
                    </thead>

                    <tbody>{}</tbody>
                </table>
            </section>
        """.format('test', 'test')

        sender = EmailSender(destination, source, subject, content)
        sender.send()
