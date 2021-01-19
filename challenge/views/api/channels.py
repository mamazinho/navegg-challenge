from challenge.models import Channel
from challenge.serializers import ChannelSerializer
from rest_framework import viewsets


class ChannelsViewSet(viewsets.ModelViewSet):
    serializer_class = ChannelSerializer
    queryset = Channel.objects.filter(status='Active')