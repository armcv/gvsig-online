# Generated by Django 2.2.28 on 2023-11-28 14:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gvsigol_plugin_geoetl', '0020_auto_20231127_1234'),
    ]

    operations = [
        migrations.AddField(
            model_name='sendemails',
            name='emails',
            field=models.TextField(blank=True, null=True),
        ),
    ]
