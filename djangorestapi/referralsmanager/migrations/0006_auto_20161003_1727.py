# -*- coding: utf-8 -*-
# Generated by Django 1.10.2 on 2016-10-03 17:27
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('referralsmanager', '0005_auto_20161003_1710'),
    ]

    operations = [
        migrations.CreateModel(
            name='GlobalCodes_FLAT',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('origin', models.CharField(max_length=20)),
                ('tfc', models.CharField(max_length=4)),
            ],
            options={
                'db_table': 'GlobalCodes_FLAT',
            },
        ),
        migrations.CreateModel(
            name='GlobalCodes_FORM',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('origin', models.CharField(max_length=20)),
                ('tfc', models.CharField(max_length=4)),
                ('wrksection', models.CharField(max_length=1)),
                ('testname', models.CharField(max_length=50)),
                ('units', models.CharField(max_length=20)),
                ('functions', models.CharField(max_length=10)),
                ('reflab', models.CharField(max_length=3)),
                ('flags', models.CharField(max_length=10)),
                ('repsection', models.CharField(max_length=1)),
                ('dontwaitforme', models.CharField(max_length=1)),
                ('rownum', models.IntegerField()),
            ],
            options={
                'db_table': 'GlobalCodes_FORM',
            },
        ),
        migrations.CreateModel(
            name='GlobalCodes_TEST',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('origin', models.CharField(max_length=20)),
                ('tlc', models.CharField(max_length=4)),
                ('tlctype', models.CharField(max_length=1)),
                ('tlcname', models.CharField(max_length=50)),
                ('fee1', models.DecimalField(decimal_places=2, max_digits=6)),
            ],
            options={
                'db_table': 'GlobalCodes_TEST',
            },
        ),
        migrations.DeleteModel(
            name='TestLibrary',
        ),
        migrations.AddField(
            model_name='globalcodes_map',
            name='loc2',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='loc2', to='referralsmanager.GlobalCodes_Locations'),
        ),
        migrations.AlterField(
            model_name='globalcodes_map',
            name='loc1',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='loc1', to='referralsmanager.GlobalCodes_Locations'),
        ),
        migrations.AddField(
            model_name='globalcodes_flat',
            name='form',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='referralsmanager.GlobalCodes_FORM'),
        ),
        migrations.AddField(
            model_name='globalcodes_flat',
            name='tlc',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='referralsmanager.GlobalCodes_TEST'),
        ),
        migrations.AddField(
            model_name='globalcodes_map',
            name='form',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='referralsmanager.GlobalCodes_FORM'),
        ),
    ]
