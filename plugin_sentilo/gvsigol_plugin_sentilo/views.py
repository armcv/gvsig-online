# -*- coding: utf-8 -*-
from django.shortcuts import HttpResponse, render, redirect

def sentilo_conf(request):
    return render(request, 'sentilo_conf.html', {})