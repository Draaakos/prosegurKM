import csv
from api.models import Car
from api.models import CarType
from api.models import Service

service_data = [
    {"ppu": "RGDZ10", "service": "Operativo"},
    {"ppu": "RGDZ14", "service": "Operativo"},
    {"ppu": "RGDZ15", "service": "Operativo"},
    {"ppu": "RGDZ16", "service": "Operativo"},
    {"ppu": "RFTV34", "service": "Operativo"},
    {"ppu": "RFTV35", "service": "Operativo"},
    {"ppu": "RFTV36", "service": "Operativo"},
    {"ppu": "RFTV37", "service": "Operativo"},
    {"ppu": "RFTV38", "service": "Operativo"},
    {"ppu": "RFTT47", "service": "Operativo"},
    {"ppu": "KKSJ47", "service": "Operativo"},
    {"ppu": "LLXV46", "service": "Operativo"},
    {"ppu": "LLWR49", "service": "Operativo"},
    {"ppu": "RGDZ50", "service": "Operativo"},
    {"ppu": "PHYL73", "service": "Operativo"},
    {"ppu": "SKTZ38", "service": "Operativo"},
    {"ppu": "PHYL-69", "service": "Operativo"},
    {"ppu": "PHYK-96", "service": "Operativo"},
    {"ppu": "PHYL-84", "service": "Operativo"},
    {"ppu": "SVLH21", "service": "Operativo"},
    {"ppu": "SVLH18", "service": "Operativo"},
    {"ppu": "SVLH17", "service": "Operativo"},
    {"ppu": "SVWH26", "service": "Operativo"},
    {"ppu": "SVLH22", "service": "Operativo"},
    {"ppu": "SVWH27", "service": "No operativo"}
]


filename = 'camionetas.csv'


def _get_service_by_ppu(ppu):
    service = None

    for item in service_data:
        item_ppu = item['ppu'].upper()
        new_ppu = ppu.upper()

        if item_ppu == new_ppu:
            service = item['service']
    return service

def car_dto(row):
    return {
        'ppu': row[0],
        'type': row[1],
        'mileage_preventive_limit': row[2],
        'mileage': row[4],
        'r_tecn': row[5],
        'p_circ': row[6],
    }

def _make_new_service(name_service):
    service = Service()
    service.name = name_service
    service.save()
    return service


def run():
    # Open the CSV file
    cars = []
    with open(filename, mode='r', newline='') as file:
        csv_reader = csv.reader(file)
        header = next(csv_reader)

        for idx, row in enumerate(csv_reader):
            if idx > 0:
                cars.append(car_dto(row))


    for car in cars:
        car_type = CarType.objects.filter(name=car['type'].lower())
        if len(car_type) == 0:
            new_car_type = CarType()
            new_car_type.name = car['type'].lower()
            new_car_type.save()

        car_ppu = car['ppu'].upper()
        active_car = Car.objects.filter(ppu=car_ppu)

        if len(Car.objects.filter(ppu=car_ppu)) == 0:
            new_car_type = CarType.objects.get(name=car['type'].lower())
            new_car_ppu = car['ppu'].upper()

            new_car_mileage = float(car['mileage'])
            new_car_mileage_preventive_limit = float(car['mileage_preventive_limit'])

            name_current_service = _get_service_by_ppu(new_car_ppu)

            new_car_current_service = None
            if name_current_service is None:
                new_car_current_service = Service.objects.get(pk=1)
            else:
                new_car_current_service = Service.objects.filter(name=name_current_service)
                if len(new_car_current_service) == 0:
                    new_car_current_service = _make_new_service(name_current_service)
                else:
                    new_car_current_service = Service.objects.get(name=name_current_service)

            new_car = Car()
            new_car.ppu = new_car_ppu
            new_car.car_type = new_car_type
            new_car.mileage = new_car_mileage
            new_car.mileage_preventive_limit = new_car_mileage_preventive_limit
            new_car.service = new_car_current_service
            new_car.save()
