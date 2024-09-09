from django import forms
from .models import Car, CarKilometerLog


class CarForm(forms.ModelForm):
    class Meta:
        model = Car
        fields = ['ppu', 'car_type', 'mileage', 'mileage_limit', 'service']
        widgets = {
            'extinguisher': forms.DateTimeInput(attrs={'readonly': 'readonly'}),
        }


class CarKilometerLogForm(forms.ModelForm):
    class Meta:
        model = CarKilometerLog
        fields = ['car', 'mileage', 'mileage_date']