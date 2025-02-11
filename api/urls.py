from django.urls import path
from . import views

from django.utils.decorators import method_decorator
from django.contrib.auth.decorators import user_passes_test
from django.http import HttpResponse


def user_is_authenticated(request):
    session_id = request.session.get('user_id')

    if session_id is None:
        return False
    else:
        return True


def user_passes_test_cookie(view_func):
    def _wrapped_view(request, *args, **kwargs):
        if user_is_authenticated(request):
            return view_func(request, *args, **kwargs)
        return HttpResponse('Unauthorized', status=401)
    return _wrapped_view


urlpatterns = [
    path('cars/', user_passes_test_cookie(views.car_view), name='car_list_create'),
    path('cars/<int:car_id>/', user_passes_test_cookie(views.car_view), name='car_detail'),

    path('logs/', user_passes_test_cookie(views.logs_view), name='logs'),
    path('logs/<int:year>/<int:month>/car/<int:car_id>/', user_passes_test_cookie(views.logs_month_car_view), name='logs_month_car_view'),

    path('car/<int:car_id>/document', user_passes_test_cookie(views.car_document), name='car_document'),
    path('car/<int:car_id>/document/<int:document_id>', user_passes_test_cookie(views.car_document), name='deleted_document'),

    path('cars/stamp/', user_passes_test_cookie(views.car_stamp_view), name='car_stamp'),

    path('cars/kilometers/logs/', user_passes_test_cookie(views.car_kilometer_log_view), name='log_list_create'),
    path('cars/kilometers/logs/<int:log_id>/', user_passes_test_cookie(views.car_kilometer_log_view), name='log_detail'),

    path('cars/filter/services', user_passes_test_cookie(views.service_car_list), name='service_car_list'),

    path('document/types', user_passes_test_cookie(views.document_type_list), name='document_type_list'),

    path('car/types', user_passes_test_cookie(views.car_type_list), name='car_type_list'),

    path('month/', user_passes_test_cookie(views.month_view), name='month_view'),

    path('login', views.login_view, name='login'),
]
