from django import forms
from .models import Car, CarKilometerLog, CarStamp


class CarForm(forms.ModelForm):
    class Meta:
        model = Car
        fields = ['ppu', 'car_type', 'mileage', 'mileage_preventive_limit', 'mileage_preventive_notification', 'service']
        widgets = {
            'extinguisher': forms.DateTimeInput(attrs={'readonly': 'readonly'}),
        }


class CarKilometerLogForm(forms.ModelForm):
    class Meta:
        model = CarKilometerLog
        fields = ['car', 'prev_mileage_am', 'mileage_am', 'prev_mileage_pm', 'mileage_pm', 'mileage_date']

