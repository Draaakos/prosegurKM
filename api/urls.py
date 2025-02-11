from django.urls import path
from . import views

from django.contrib.auth.decorators import user_passes_test

def user_is_authenticated(user):
    return user.is_authenticated

urlpatterns = [
    path('cars/', user_passes_test(user_is_authenticated)(views.car_view), name='car_list_create'),
    path('cars/<int:car_id>/', user_passes_test(user_is_authenticated)(views.car_view), name='car_detail'),

    path('logs/', user_passes_test(user_is_authenticated)(views.logs_view), name='logs'),
    path('logs/<int:year>/<int:month>/car/<int:car_id>/', user_passes_test(user_is_authenticated)(views.logs_month_car_view), name='logs_month_car_view'),

    path('car/<int:car_id>/document', user_passes_test(user_is_authenticated)(views.car_document), name='car_document'),
    path('car/<int:car_id>/document/<int:document_id>', user_passes_test(user_is_authenticated)(views.car_document), name='deleted_document'),

    path('cars/stamp/', user_passes_test(user_is_authenticated)(views.car_stamp_view), name='car_stamp'),

    path('cars/kilometers/logs/', user_passes_test(user_is_authenticated)(views.car_kilometer_log_view), name='log_list_create'),
    path('cars/kilometers/logs/<int:log_id>/', user_passes_test(user_is_authenticated)(views.car_kilometer_log_view), name='log_detail'),

    path('cars/filter/services', user_passes_test(user_is_authenticated)(views.service_car_list), name='service_car_list'),

    path('document/types', user_passes_test(user_is_authenticated)(views.document_type_list), name='document_type_list'),

    path('car/types', user_passes_test(user_is_authenticated)(views.car_type_list), name='car_type_list'),

    path('login', views.login_view, name='login'),
]
