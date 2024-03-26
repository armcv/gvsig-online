from django.urls import path
from django.views.i18n import JavaScriptCatalog
from gvsigol_plugin_sentilo import views

urlpatterns = [
    path('sentilo/sentilo_conf/', views.sentilo_conf, name='sentilo_conf'),
]