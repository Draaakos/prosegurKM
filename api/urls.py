from django.urls import path
from . import views

urlpatterns = [
    path('cars/', views.car_view, name='car_list_create'),
    path('cars/<int:car_id>/', views.car_view, name='car_detail'),

    path('cars/stamp/', views.car_stamp_view, name='car_stamp'),

    path('cars/kilometers/logs/', views.car_kilometer_log_view, name='log_list_create'),
    path('cars/kilometers/logs/<int:log_id>/', views.car_kilometer_log_view, name='log_detail'),

    path('cars/filter/services', views.service_car_list, name='service_car_list'),
]
