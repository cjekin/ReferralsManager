from rest_framework import generics, mixins, permissions, viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import BasicAuthentication
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from rest_framework.response import Response
from rest_framework.views import APIView
import datetime

from django.db.models import Q
from . import models
from . import serializers

#from knox.auth import TokenAuthentication

#
# Authentication and security
#

def jwt_response_payload_handler(token, user=None, request=None):
    return {
        'token': token,
        'user': serializers.UserSerializer(user, context={'request': request}).data,
        'expiry': datetime.datetime.now() + datetime.timedelta(seconds=300)
    }

class ListTLC(APIView):
    authentication_classes = (BasicAuthentication, JSONWebTokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    
    def get(self, request, format=None):
        tlcs = models.TLC.objects.all() #.filter(id=self.kwargs['pk'])
        serializer = serializers.TLC_Serializer(tlcs, many=False)
        return Response(serializer.data)
        
    def post(self, request, format=None):
        print(request)
        serializer = serializers.TLC_Serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        

        
    

#
# TLC detail page
#

class RetrieveUpdateDestroyTLC(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.DjangoModelPermissions,)
    queryset = models.TLC.objects.all()
    serializer_class = serializers.TLC_Serializer
    
    
# A full view

# from rest_framework import status
# from rest_framework.views import APIView
# from rest_framework.response import Response

# from .request_log.mixins import RequestLogViewMixin

# class FakeAuth(RequestLogViewMixin,generics.ListAPIView):
#     print('Got a request for FakeAuth')
#     def post(self, request, *args, **kwargs):
#         return Response('Hello', status=status.HTTP_201_CREATED)

#class FakeAuth(APIView):
#    print('Got a request for FakeAuth')
#    def post(self, request, *args, **kwargs):
#        print(self.request.META.get('Authorization', 'No Authorization'))
#        print(self.request.META.get('HTTP_SECRET_KEY', None))
#    

