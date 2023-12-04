from rest_framework import serializers
import shopify


# STATUS_CHOICES = (
#     ('active','ACTIVE'),
#     ('draft','DRAFT')
# )


class ProductSerializer(serializers.Serializer):
    id = serializers.IntegerField(required = False)
    title = serializers.CharField(max_length = 200,min_length=5)
    published_at = serializers.DateTimeField(required = False)
    updated_at = serializers.DateTimeField(required = False)
    # status = serializers.ChoiceField(choices=STATUS_CHOICES)
    status = serializers.CharField(max_length=50,required=False)
    vendor = serializers.CharField(max_length = 200,required=False)
