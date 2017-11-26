# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import datetime


class Migration(migrations.Migration):

    dependencies = [
        ('tdeemanager', '0002_auto_20171126_1723'),
    ]

    operations = [
        migrations.CreateModel(
            name='Entry',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('date', models.DateField(verbose_name='Date', default=datetime.date.today)),
                ('calories', models.FloatField(verbose_name='Calories')),
                ('weight', models.FloatField(verbose_name='Weight')),
                ('user', models.ForeignKey(verbose_name='user', to='tdeemanager.Profile', related_name='entry')),
            ],
            options={
                'verbose_name': 'Entry',
                'ordering': ('user', 'date'),
                'verbose_name_plural': 'Entries',
            },
        ),
        migrations.AlterUniqueTogether(
            name='entry',
            unique_together=set([('user', 'date')]),
        ),
    ]
