# Generated by Django 2.2.19 on 2021-03-10 12:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gvsigol_core', '0036_auto_20210310_1145'),
    ]

    operations = [
        migrations.AlterField(
            model_name='project',
            name='logo',
            field=models.ImageField(blank=True, default='', null=True, upload_to='images'),
        ),
    ]
