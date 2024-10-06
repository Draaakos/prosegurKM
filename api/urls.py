from django.urls import path
from . import views

urlpatterns = [
    path('cars/', views.car_view, name='car_list_create'),
    path('cars/<int:car_id>/', views.car_view, name='car_detail'),

    path('cars/kilometers/logs/', views.view_car_kilometer_log, name='log_list_create'),
    path('cars/kilometers/logs/<int:log_id>/', views.view_car_kilometer_log, name='log_detail'),
]
