# -*- coding: utf-8 -*-
# Generated by Django 1.11.24 on 2020-10-20 14:47
from __future__ import unicode_literals

from django.db import migrations
from gvsigol_services.triggers import INVERSE_GEOCODER_CARTOCIUDAD_FUNCTION_SIGNATURE, INVERSE_GEOCODER_CARTOCIUDAD_FUNCTION_NAME, INVERSE_GEOCODER_CARTOCIUDAD_FUNCTION_SCHEMA, InverseGeocoderCartociudad, install_procedure, drop_procedure

TRIGGER_SIGNATURE = INVERSE_GEOCODER_CARTOCIUDAD_FUNCTION_SIGNATURE
FUNCTION_DEF_REVERSE = "DROP FUNCTION IF EXISTS " + TRIGGER_SIGNATURE

def insert_def(apps, schema_editor):
    try:
        from django.utils.translation import ugettext_noop as _
        TriggerProcedure = apps.get_model("gvsigol_services", "TriggerProcedure")
        procedure = TriggerProcedure()
        procedure.signature = TRIGGER_SIGNATURE
        procedure.func_name = INVERSE_GEOCODER_CARTOCIUDAD_FUNCTION_NAME
        procedure.func_schema = INVERSE_GEOCODER_CARTOCIUDAD_FUNCTION_SCHEMA
        procedure.label = _('Inverse Geocoder Cartociudad')
        procedure.definition_tpl = InverseGeocoderCartociudad().get_definition()
        procedure.activation = 'BEFORE'
        procedure.event = 'INSERT OR UPDATE'
        procedure.orientation = 'ROW'
        procedure.save()
        
        install_procedure(procedure.pk)

    except Exception as error:
        print error

def remove_def(apps, schema_editor):
    try:
        drop_procedure(INVERSE_GEOCODER_CARTOCIUDAD_FUNCTION_SIGNATURE)
        TriggerProcedure = apps.get_model("gvsigol_services", "TriggerProcedure")
        TriggerProcedure.objects.filter(signature=INVERSE_GEOCODER_CARTOCIUDAD_FUNCTION_SIGNATURE).delete()
    except Exception as error:
        print error
        
class Migration(migrations.Migration):
    dependencies = [
        ('gvsigol_services', '0038_auto_20201021_1305'),
    ]

    operations = [
        migrations.RunPython(insert_def, reverse_code=remove_def),
    ]
