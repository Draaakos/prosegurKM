import os
import json
import hmac, hashlib
import codecs
from threading import Thread
from django.core.mail import EmailMultiAlternatives


class EmailSender(Thread):
    def __init__(self, destination='', source='', subject='', content=''):
        Thread.__init__(self)
        self.destination = destination
        self.source = source
        self.content = content
        self.subject = subject

    def send(self):
        self.start()

    def run(self):
        try:
            email = EmailMultiAlternatives(
                self.subject,
                self.content,
                self.source,
                [self.destination]
            )

            email.attach_alternative(self.content, 'text/html')
            email.send()
        except AttributeError:
            pass
