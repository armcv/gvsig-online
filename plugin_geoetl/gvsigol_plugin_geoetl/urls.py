from django.urls import path
from django.views.i18n import JavaScriptCatalog
from gvsigol_plugin_geoetl import views

urlpatterns = [
    path('etl/get_conf/', views.get_conf, name='get_conf'),
    path('etl/etl_canvas/', views.etl_canvas, name='etl_canvas'),
    path('etl/etl_read_canvas/', views.etl_read_canvas, name='etl_read_canvas'),
    path('etl/etl_sheet_excel/', views.etl_sheet_excel, name='etl_sheet_excel'),
    path('etl/etl_schema_excel/', views.etl_schema_excel, name='etl_schema_excel'),
    path('etl/etl_schema_shape/', views.etl_schema_shape, name='etl_schema_shape'),
    path('etl/test_conexion/', views.test_conexion, name='test_conexion'),
    path('etl/save_conexion/', views.save_conexion, name='save_conexion'),
    path('etl/etl_schema_csv/', views.etl_schema_csv, name='etl_schema_csv'),
    path('etl/etl_workspace_list/', views.etl_workspace_list, name='etl_workspace_list'),
    path('etl/etl_workspace_add/', views.etl_workspace_add, name='etl_workspace_add'),
    path('etl/etl_workspace_delete/', views.etl_workspace_delete, name='etl_workspace_delete'),
    path('etl/etl_workspace_download/', views.etl_workspace_download, name='etl_workspace_download'),
    path('etl/etl_workspace_upload/', views.etl_workspace_upload, name='etl_workspace_upload'),
    path('etl/etl_workspace_update/', views.etl_workspace_update, name='etl_workspace_update'),
    path('etl/etl_current_canvas_status/', views.etl_current_canvas_status, name='etl_current_canvas_status'),
    path('etl/etl_list_canvas_status/', views.etl_list_canvas_status, name='etl_list_canvas_status'),
    path('etl/etl_owners_oracle/', views.etl_owners_oracle, name='etl_owners_oracle'),
    path('etl/etl_tables_oracle/', views.etl_tables_oracle, name='etl_tables_oracle'),
    path('etl/etl_schema_oracle/', views.etl_schema_oracle, name='etl_schema_oracle'),
    path('etl/etl_proced_indenova/', views.etl_proced_indenova, name='etl_proced_indenova'),
    path('etl/etl_schema_indenova/', views.etl_schema_indenova, name='etl_schema_indenova'),
    path('etl/etl_schema_postgresql/', views.etl_schema_postgresql, name='etl_schema_postgresql'),
    path('etl/etl_schema_kml/', views.etl_schema_kml, name='etl_schema_kml'),
    path('etl/etl_schemas_name_postgres/', views.etl_schemas_name_postgres, name='etl_schemas_name_postgres'),
    path('etl/etl_table_name_postgres/', views.etl_table_name_postgres, name='etl_table_name_postgres'),
]