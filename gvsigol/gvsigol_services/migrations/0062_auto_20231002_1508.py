# Generated by Django 2.2.28 on 2023-10-02 15:08

from django.db import migrations, models


def remove_layergrouprole_duplicates(apps, schema_editor):
    LayerGroupRole = apps.get_model("gvsigol_services", "LayerGroupRole")
    for row in LayerGroupRole.objects.all().order_by("-id"):
        try:
            if LayerGroupRole.objects.filter(layergroup=row.layergroup, role=row.role, permission=row.role).count() > 1:
                row.delete()
        except Exception as e:
            print(str(e))
            # rollback transaction to get a clean DB connection status
            schema_editor.execute("ROLLBACK")

class Migration(migrations.Migration):

    dependencies = [
        ('gvsigol_services', '0061_auto_20230914_1227'),
    ]

    operations = [
        migrations.RunPython(remove_layergrouprole_duplicates, reverse_code=migrations.RunPython.noop),
        migrations.AddConstraint(
            model_name='layergrouprole',
            constraint=models.UniqueConstraint(fields=('layergroup', 'permission', 'role'), name='unique_permission_role_per_layergroup'),
        ),
    ]
