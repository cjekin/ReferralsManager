# -*- coding: utf-8 -*-
# Generated by Django 1.10.2 on 2016-10-08 23:05
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('referralsmanager', '0034_auto_20161008_2243'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tlc',
            name='tfcs',
            field=models.ManyToManyField(to='referralsmanager.Form'),
        ),
    ]
