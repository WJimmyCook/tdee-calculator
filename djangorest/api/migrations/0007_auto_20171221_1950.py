# Generated by Django 2.0 on 2017-12-21 19:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_auto_20171221_1949'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='goalWeight',
            field=models.FloatField(blank=True, default=None, null=True),
        ),
        migrations.AlterField(
            model_name='profile',
            name='weeklyWeightChange',
            field=models.FloatField(blank=True, default=None, null=True),
        ),
    ]
