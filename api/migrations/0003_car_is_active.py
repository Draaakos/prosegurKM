# Generated by Django 5.1 on 2025-02-05 17:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_notificationlog'),
    ]

    operations = [
        migrations.AddField(
            model_name='car',
            name='is_active',
            field=models.BooleanField(default=True),
        ),
    ]
