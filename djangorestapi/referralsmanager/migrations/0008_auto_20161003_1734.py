# -*- coding: utf-8 -*-
# Generated by Django 1.10.2 on 2016-10-03 17:34
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('referralsmanager', '0007_auto_20161003_1733'),
    ]

    operations = [
        migrations.RenameField(
            model_name='globalcodes_form',
            old_name='reflab_id',
            new_name='ref',
        ),
    ]