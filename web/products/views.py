from django.shortcuts import render,redirect
from apps.accounts.decorators import session_token_required,session_token
from django.http import HttpResponse,JsonResponse
import shopify
from rest_framework.generics import GenericAPIView,ListAPIView
from .serializers import ProductSerializer,ProductModelSerializer
from rest_framework.permissions import IsAuthenticated
from apps.accounts.authentication import ShopifyAuthentication
from rest_framework.response import Response
from .models import Products
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
from django.db.models import Q

@session_token_required
@api_view(['GET','POST'])
def products(request,pk=None):
    products = shopify.Product.find()
    s = ProductSerializer(products,many=True)

    result = s.data

    filter_value = request.GET.get('sort')
    # if filter_value:
    #     result = filter_data(s,filter_value)
        # return Response(result)

    search_value = request.GET.get('search')
    if search_value:
        result = search_data(s,search_value,filter_value)
        search_value = ''
        # return Response(result)
    else:
        if filter_value :
            result = filter_data(s.data,filter_value)
            # return Response(result)

        
    return Response(result)


def filter_data(s,filter_value):
    if filter_value == 'TITLE ASC':
        data = [s for s in sorted(s,key=lambda x : x['title'])]
        return data
    if filter_value == 'TITLE DESC':
        data = [s for s in sorted(s,key=lambda x : x['title'],reverse=True)]
        return data
    if filter_value == 'VENDOR ASC':
        data = [s for s in sorted(s,key=lambda x : x['vendor'])]
        return data
    if filter_value == 'VENDOR DESC':
        data = [s for s in sorted(s,key=lambda x : x['vendor'],reverse=True)]
        return data



def search_data(s,search_value,filter_value):
    status_data = [s for s in s.data if s['status']==search_value]
    if status_data:
        if filter_value:
            status_data = filter_data(status_data,filter_value)
            return status_data
        return status_data

    vendor_data = [s for s in s.data if s['vendor']==search_value]
    if vendor_data:
        if filter_value:
            vendor_data = filter_data(vendor_data,filter_value)
            return vendor_data
        return vendor_data
    
    title_data = [s for s in s.data if search_value in s['title']]
    if title_data:
        if filter_value:
            title_data = filter_data(title_data,filter_value)
            return title_data
        return title_data
    
    # else:
    #     # all = [s for s in s.data]
    #     if filter_value:
    #         all = filter_data(s.data,filter_value)
    #         return all
    #     return s.data

@csrf_exempt
@session_token_required
@api_view(['GET','POST'])
def create_products(request,*args, **kwargs):
    s = ProductSerializer(data=request.data)
    if s.is_valid():
        p = shopify.Product(request.data)
        # p.title = request.data['title']
        p.save()
        title = p.title
        return Response({'products': f"{title} created"})
    else:
        return Response({'products' : f"{s.errors} occured"})


@csrf_exempt
@session_token_required
@api_view(['GET','POST'])
def update_products(request,*args, **kwargs):
    if request.method == "POST":
        s = ProductSerializer(data = request.data)
        if s.is_valid():
            product = shopify.Product.find(request.data['id'])
            # product.title = request.data['title']
            product._update(request.data)
            title = product.title
            product.save()
            query = '''
                  {
  products (first:100, query:"status:active AND published_status:published") {
    nodes {
      id,
      title,
      status,
      vendor,
      tags,
      createdAt,
      updatedAt,
    }
  }
}
             '''
            result = shopify.GraphQL().execute(query)
            # return Response({'type': json.loads(result)})
            return Response(json.loads(result))
            # return Response({'id': f"{title} updated"})
        else:
            return Response({'id' : 'validation error'})
    else:
        return Response({'id':'not exist'})

@csrf_exempt
@session_token_required
@api_view(['GET','DELETE'])
def delete_products(request,*args, **kwargs):
    if request.method == "DELETE":
        id = request.data
        product = shopify.Product.find(id)
        title = product.title
        product.destroy()
        return Response({'id':f"{title} deleted"})


# class ProductView()