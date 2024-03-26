# -*- coding: utf-8 -*-
from django.shortcuts import HttpResponse, render, redirect
from gvsigol_plugin_sentilo.services.sentilo import process_sentilo_request
def sentilo_conf(request):        
    if request.method == 'GET':
        return render(request, 'sentilo_conf.html', {})
    
    if request.method == 'POST':
        sensors = request.POST.get('sensors')
        table_name = request.POST.get('table_name')
        domain = request.POST.get('domain')
        identity_key = request.POST.get('identity_key')
        interval = request.POST.get('interval')
        dicc = {
            'sensors': sensors,
            'table_name': table_name,
            'domain': domain,
            'identity_key': identity_key,
            'interval': int(interval)
        }
        process_sentilo_request(dicc)
        return redirect('/sentilo')