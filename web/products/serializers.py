from rest_framework import serializers
import shopify


# STATUS_CHOICES = (
#     ('active','ACTIVE'),
#     ('draft','DRAFT')
# )


class ProductSerializer(serializers.Serializer):
    id = serializers.IntegerField(required = False)
    title = serializers.CharField(max_length = 200)
    published_at = serializers.DateTimeField(required = False)
    updated_at = serializers.DateTimeField(required = False)
    # status = serializers.ChoiceField(choices=STATUS_CHOICES)
    status = serializers.CharField(max_length=50,required=False,allow_blank=True)
    vendor = serializers.CharField(max_length = 200,required=False,allow_blank=True)


    def validate_title(self,value):
        if len(value) < 6:
            raise serializers.ValidationError("title should be minimum length of 6")
        return value
    
    def validate_status(self,value):
        if value not in ['active','draft']:
            raise serializers.ValidationError("status should be either 'active' or 'draft'")
        return value
    
    def validate_vendor(self,value):
        if value == "bibek custom shop":
            raise serializers.ValidationError("vendor name is matched with owner's vendor name")
        return value