from .controller.car import CarView
from .controller.car_kilometerlog import CarKilometerLogView
from .controller.selector import fetch_car_service_list

car_view = CarView.as_view()
car_kilometer_log_view = CarKilometerLogView.as_view()
service_car_list = fetch_car_service_list
