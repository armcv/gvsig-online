# Generated by Django 2.2.18 on 2021-04-28 14:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gvsigol_plugin_geoetl', '0003_etlstatus_etlworkspaces'),
    ]

    operations = [
        migrations.AddField(
            model_name='etlstatus',
            name='id_ws',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
