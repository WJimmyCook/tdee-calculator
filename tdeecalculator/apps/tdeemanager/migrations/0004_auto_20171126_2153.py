# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tdeemanager', '0003_auto_20171126_2148'),
    ]

    operations = [
        migrations.AlterField(
            model_name='entry',
            name='user',
            field=models.ForeignKey(verbose_name='user', related_name='entries', to='tdeemanager.Profile'),
        ),
    ]
