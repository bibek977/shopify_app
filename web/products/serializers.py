from rest_framework import serializers
from .models import Products
import shopify
from apps.accounts.decorators import session_token_required

STATUS_CHOICES = (
    ('active','ACTIVE'),
    ('draft','DRAFT')
)


class ProductSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    title = serializers.CharField(max_length = 200)
    published_at = serializers.DateTimeField()
    updated_at = serializers.DateTimeField()
    # status = serializers.ChoiceField(choices=STATUS_CHOICES)
    status = serializers.CharField(max_length=50)
    vendor = serializers.CharField(max_length = 200)

    @session_token_required
    def create(self, validated_data):
        product = shopify.Product()
        # for attr in ['title','published_at','updated_at','status','vendor']:
            # setattr(product,attr,validated_data.get(attr))
        product.title = validated_data['title']
        # product.save()
        return product.save()

    @session_token_required
    def update(self, instance, validated_data):
        product = shopify.Product.find(instance.id)
        for attr in ['title','published_at','updated_at','status','vendor']:
            setattr(product,attr,validated_data.get(attr,getattr(instance,attr)))

        return product.save()

        return product
