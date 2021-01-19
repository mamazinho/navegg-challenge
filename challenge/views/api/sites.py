from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response

from challenge.models import Site
from challenge.serializers import SiteSerializer

class SitesViewSet(viewsets.ModelViewSet):
    serializer_class = SiteSerializer
    queryset = Site.objects.filter(status='active')