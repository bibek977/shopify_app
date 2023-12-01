from django.shortcuts import render,redirect
from apps.accounts.decorators import session_token_required,session_token
from django.http import HttpResponse,JsonResponse
import shopify
from rest_framework.generics import GenericAPIView
from .serializers import ProductSerializer
from rest_framework.permissions import IsAuthenticated
from apps.accounts.authentication import ShopifyAuthentication
from rest_framework.response import Response
from .models import Products
from rest_framework.renderers import JSONRenderer
from rest_framework import viewsets
import json
    

@session_token_required
def products(request):
    products = shopify.Product.find()
    return JsonResponse({'products' : [p.to_dict() for p in products]})


@session_token_required
def products_delete(request,id):
    product = shopify.Product.find(id)
    product.destroy()
    return redirect('products')
