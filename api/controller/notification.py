from api.services import EmailSender
from api.models import NotificationLog
from .email_content import (
    PREVENTIVE_KM_EMAIL,
    LIMIT_KM_EMAIL,
    STAMP_ADD_EMAIL,
    STAMP_REMOVE_EMAIL,
    DOCUMENT_ADD_EMAIL,
    DOCUMENT_REMOVE_EMAIL
)
from django.conf import settings




class Notification:
    def __init__(self, destination = settings.EMAIL_DESTINATION):
        self.destination = destination


    def send_preventive_km(self, car):
        source = settings.EMAIL_HOST_USER
        subject = f'Notificación de KM preventivo'

        content = PREVENTIVE_KM_EMAIL.format(
            car.ppu
        )

        self._insert_notification_log(car, 'preventivo')
        sender = EmailSender(self.destination, source, subject, content)
        sender.send()


    def send_exceded_km(self, car):
        source = settings.EMAIL_HOST_USER
        subject = f'Notificación de KM excedido'

        content = LIMIT_KM_EMAIL.format(
            car.ppu
        )

        self._insert_notification_log(car, 'excedido')
        sender = EmailSender(self.destination, source, subject, content)
        sender.send()


    def send_add_stamp(self, car, stamp):
        source = settings.EMAIL_HOST_USER
        subject = f'Notificación nuevo sello'

        content = STAMP_ADD_EMAIL.format(
            car.ppu,
            stamp.name
        )

        sender = EmailSender(self.destination, source, subject, content)
        sender.send()


    def send_remove_stamp(self, car, stamp):
        source = settings.EMAIL_HOST_USER
        subject = f'Notificación sello eliminado'

        content = STAMP_REMOVE_EMAIL.format(
            car.ppu,
            stamp.name
        )

        sender = EmailSender(self.destination, source, subject, content)
        sender.send()


    def send_add_document(self, car):
        source = settings.EMAIL_HOST_USER
        subject = f'Notificación nuevo documento'

        content = DOCUMENT_ADD_EMAIL.format(
            car.ppu
        )

        sender = EmailSender(self.destination, source, subject, content)
        sender.send()


    def send_remove_document(self, car):
        source = settings.EMAIL_HOST_USER
        subject = f'Notificación documento eliminado'

        content = DOCUMENT_REMOVE_EMAIL.format(
            car.ppu
        )

        sender = EmailSender(self.destination, source, subject, content)
        sender.send()


    def _insert_notification_log(self, car, notification_type):
        notification_log = NotificationLog()
        notification_log.ppu = car.ppu
        notification_log.notification_type = notification_type
        notification_log.save()
