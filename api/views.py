from .controller.car import CarView
from .controller.car_kilometerlog import CarKilometerLogView

car_view = CarView.as_view()
view_car_kilometer_log = CarKilometerLogView.as_view()