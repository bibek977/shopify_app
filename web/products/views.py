from django.shortcuts import render
from apps.accounts.decorators import session_token_required,session_token
from django.http import HttpResponse,JsonResponse
import shopify
from rest_framework.generics import GenericAPIView
from .serializers import ProductSerializer
from rest_framework.permissions import IsAuthenticated
from apps.accounts.authentication import ShopifyAuthentication
from rest_framework.response import Response

class ProductsView(GenericAPIView):
    serializer_class = ProductSerializer
    # permission_classes = [IsAuthenticated,]
    # authentication_classes = [ShopifyAuthentication]

    @session_token_required
    def products(request,*args, **kwargs):
        # product_list = shopify.Product.find()
        # for p in product_list:
            # p.to_dict()
        name = "bibek"
        s = ProductSerializer(name)
        return Response(s.data)


# def products(request):
#     response = {
#         "name" : "bibek"
#     }
#     print("===================\n===================\n===================\n===================\n===================\n===================\n===================\n===================\n===================\n===================\n===================\n===================\n===================\n===================\n===================\n")
#     return JsonResponse(products,safe=False)