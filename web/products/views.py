from django.shortcuts import render,redirect
from apps.accounts.decorators import session_token_required,session_token
from django.http import HttpResponse,JsonResponse
import shopify
from rest_framework.generics import GenericAPIView,ListAPIView
from .serializers import ProductSerializer
from rest_framework.permissions import IsAuthenticated
from apps.accounts.authentication import ShopifyAuthentication
from rest_framework.response import Response
from .models import Products
from rest_framework.renderers import JSONRenderer
from rest_framework import viewsets
import json
from django.views import View
from rest_framework.views import APIView   
from django.views.decorators.csrf import csrf_exempt 
from django.utils.decorators import method_decorator
from rest_framework.response import Response
from rest_framework.decorators import api_view

@session_token_required
@api_view(['GET'])
def products(request):
    # prdouct = shopify.Product.find(8140922388668)
    # prdouct.destroy()
    products = shopify.Product.find()
    s = ProductSerializer(products,many=True)
    return Response(s.data)



# class ProductsView(APIView):

#     @session_token_required
#     def get(self,request,format=None,*args, **kwargs):
#         products = shopify.Product.find()
#         s = ProductSerializer(products,many=True)
#         return Response(s.data)


