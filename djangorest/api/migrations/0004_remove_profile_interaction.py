# Generated by Django 2.0 on 2017-12-21 14:31

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_profile'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='profile',
            name='interaction',
        ),
    ]
