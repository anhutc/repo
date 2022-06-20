# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-03-26 01:44
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('WEIPDCRM', '0007_auto_20170326_0340'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='setting',
            name='qq_group_number',
        ),
        migrations.AddField(
            model_name='setting',
            name='qq_group_url',
            field=models.URLField(help_text='Show QQ Group link in mobile package info page', max_length=255, null=True, verbose_name='QQ Group URL'),
        ),
    ]
