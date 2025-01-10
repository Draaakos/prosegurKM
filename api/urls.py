from django.urls import path
from . import views

urlpatterns = [
    path('cars/', views.car_view, name='car_list_create'),
    path('cars/<int:car_id>/', views.car_view, name='car_detail'),

    path('logs/', views.logs_view, name='logs'),

    path('car/<int:car_id>/document', views.car_document, name='car_document'),
    path('car/<int:car_id>/document/<int:document_id>', views.car_document, name='deleted_document'),

    path('cars/stamp/', views.car_stamp_view, name='car_stamp'),

    path('cars/kilometers/logs/', views.car_kilometer_log_view, name='log_list_create'),
    path('cars/kilometers/logs/<int:log_id>/', views.car_kilometer_log_view, name='log_detail'),

    path('cars/filter/services', views.service_car_list, name='service_car_list'),

    path('document/types', views.document_type_list, name='document_type_list'),

    path('car/types', views.car_type_list, name='car_type_list'),
]
