# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.AutoField(auto_created=True, serialize=False, primary_key=True, verbose_name='ID')),
                ('starting_weight', models.FloatField(verbose_name='Starting weight')),
                ('goal_weight', models.FloatField(verbose_name='Goal weight')),
                ('weekly_weight_change', models.FloatField(verbose_name='Goal weight loss per week')),
                ('user', models.OneToOneField(to=settings.AUTH_USER_MODEL, verbose_name='user', related_name='profile',on_delete=models.CASCADE)),
            ],
            options={
                'verbose_name_plural': 'Profiles',
                'ordering': ('user',),
                'verbose_name': 'Profile',
            },
        ),
    ]
