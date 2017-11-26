# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('tdeemanager', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='goal_weight',
            field=models.FloatField(verbose_name='Goal weight', null=True),
        ),
        migrations.AlterField(
            model_name='profile',
            name='starting_weight',
            field=models.FloatField(verbose_name='Starting weight', null=True),
        ),
        migrations.AlterField(
            model_name='profile',
            name='weekly_weight_change',
            field=models.FloatField(verbose_name='Goal weight loss per week', null=True),
        ),
    ]
