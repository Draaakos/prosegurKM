import json
from django.http import JsonResponse
from django.views import View
from api.models import NotificationLog


class LogsView(View):
    def get(self, request):
        logs = [ log.to_json for log in NotificationLog.objects.all().order_by('-created_at')[:10] ]
        return JsonResponse({ 'logs': logs })
