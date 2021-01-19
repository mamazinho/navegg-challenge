from challenge.models import Channel
from rest_framework import serializers

class ChannelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Channel
        fields = '__all__'