# Generated by Django 2.0 on 2017-12-21 23:18

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_profile_ownerpk'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='profile',
            name='ownerPk',
        ),
    ]
