from django.urls import path, include
from django.conf import settings

from challenge.views import Challenge

urlpatterns = [
    path('', Challenge.as_view, name='challenge'),
]