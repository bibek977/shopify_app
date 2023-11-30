from rest_framework import serializers


class ProductSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=100)