# -*- coding: utf-8 -*-
# Generated by Django 1.10.2 on 2016-10-05 22:40
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('referralsmanager', '0017_auto_20161005_2140'),
    ]

    operations = [
        migrations.AlterField(
            model_name='globalcodes_locations',
            name='address',
            field=models.TextField(blank=True),
        ),
        migrations.AlterField(
            model_name='globalcodes_locations',
            name='contact',
            field=models.CharField(blank=True, max_length=255),
        ),
        migrations.AlterField(
            model_name='globalcodes_locations',
            name='dynamics_code',
            field=models.CharField(blank=True, max_length=10),
        ),
        migrations.AlterField(
            model_name='globalcodes_locations',
            name='notes',
            field=models.TextField(blank=True),
        ),
        migrations.AlterField(
            model_name='globalcodes_locations',
            name='postcode',
            field=models.CharField(blank=True, max_length=20),
        ),
        migrations.AlterField(
            model_name='globalcodes_locations',
            name='telephone',
            field=models.CharField(blank=True, max_length=255),
        ),
        migrations.AlterField(
            model_name='globalcodes_locations',
            name='url',
            field=models.CharField(blank=True, max_length=255),
        ),
    ]
