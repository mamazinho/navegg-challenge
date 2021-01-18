from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from django.views import View

class Challenge(View):

    def get(self, request, data=None):
        if not data:
            data = {}
        data['email'] = data.get('email', request.GET.get('email',''))
        data['name'] = data.get('name', '')

        return render(request, 'base.html', data)