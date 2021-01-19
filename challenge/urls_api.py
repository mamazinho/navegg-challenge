from django.urls import path, include
from rest_framework.routers import DefaultRouter
from challenge.views.api import *

router = DefaultRouter()

router.register(r'sites', SitesViewSet, basename='sites')
router.register(r'channels', ChannelsViewSet, basename='channels')


urlpatterns = router.urls