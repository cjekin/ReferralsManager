# -*- coding: utf-8 -*-
# Generated by Django 1.10.2 on 2016-10-07 18:14
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('referralsmanager', '0020_auto_20161007_1809'),
    ]

    operations = [
        migrations.AlterField(
            model_name='flat',
            name='tlc',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='referralsmanager.TLC'),
        ),
    ]
