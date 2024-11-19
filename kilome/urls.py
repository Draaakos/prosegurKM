from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('web.urls')),
    path('api/v1/', include('api.urls')),
]

if settings.DEBUG:
    # Servir archivos estáticos
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

    # Servir archivos multimedia
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
