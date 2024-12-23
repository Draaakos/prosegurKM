from .controller.car import CarView
from .controller.car_kilometerlog import CarKilometerLogView
from .controller.selector import fetch_car_service_list, fetch_document_type_list
from .controller.carstamp import CarStampView
from .controller.car_document import CarDocumentView
from .controller.logs import LogsView


car_view = CarView.as_view()
car_stamp_view = CarStampView.as_view()

car_document = CarDocumentView.as_view()

car_kilometer_log_view = CarKilometerLogView.as_view()

service_car_list = fetch_car_service_list

document_type_list = fetch_document_type_list

logs_view = LogsView.as_view()
