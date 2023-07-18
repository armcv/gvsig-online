# Generated by Django 2.2.27 on 2023-07-11 13:23

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('gvsigol_core', '0044_project_toc_order_fix'),
    ]

    operations = [
        migrations.CreateModel(
            name='Application',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, unique=True)),
                ('title', models.CharField(blank=True, max_length=100, null=True)),
                ('description', models.CharField(blank=True, max_length=250, null=True)),
                ('url', models.CharField(blank=True, max_length=250, null=True)),
                ('image', models.ImageField(blank=True, default='', null=True, upload_to='images')),
                ('conf', models.TextField(blank=True, null=True)),
                ('is_public', models.BooleanField(default=False)),
                ('created_by', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='ApplicationRole',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('role', models.TextField()),
                ('application', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='gvsigol_core.Application')),
            ],
        ),
        migrations.AddIndex(
            model_name='applicationrole',
            index=models.Index(fields=['application', 'role'], name='gvsigol_cor_applica_7784d6_idx'),
        ),
    ]
