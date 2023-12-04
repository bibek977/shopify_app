from django.shortcuts import render,redirect
from apps.accounts.decorators import session_token_required,session_token
from django.http import HttpResponse,JsonResponse
import shopify
from rest_framework.generics import GenericAPIView,ListAPIView
from .serializers import ProductSerializer
from rest_framework.permissions import IsAuthenticated
from apps.accounts.authentication import ShopifyAuthentication
from rest_framework.response import Response
# from .models import Products
from rest_framework.renderers import JSONRenderer
from rest_framework import viewsets
import json
from django.views import View
from rest_framework.views import APIView   
from django.views.decorators.csrf import csrf_exempt,csrf_protect
from django.utils.decorators import method_decorator
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.authentication import BasicAuthentication
from rest_framework.permissions import IsAuthenticated

@session_token_required
@api_view(['GET','POST'])
def products(request):
    products = shopify.Product.find()
    s = ProductSerializer(products,many=True)
    return Response(s.data)

@csrf_exempt
@session_token_required
@api_view(['GET','POST'])
def create_products(request,*args, **kwargs):
    s = ProductSerializer(data=request.data)
    if s.is_valid():
        p = shopify.Product(request.data)
        # p.title = request.data['title']
        p.save()
        return Response({'products': request.data})
    else:
        return Response({'products' : s.errors})


@csrf_exempt
@session_token_required
@api_view(['GET','PUT'])
def put_products(request,*args, **kwargs):
    # data = request.data
    product = shopify.Product.find(8142893154492)
    product.title = "cotton pants 100"
    product.save()  
    s = ProductSerializer(shopify.Product.find(),many=True)

    return Response(s.data)

@csrf_exempt
@session_token_required
@api_view(['GET','DELETE'])
def delete_products(request,*args, **kwargs):
    product = shopify.Product.find(request.data)
    product.destroy()
    s = ProductSerializer(shopify.Product.find(),many=True)
    return Response(s.data)


