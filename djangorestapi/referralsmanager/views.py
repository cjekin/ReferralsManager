from rest_framework import generics, mixins, permissions, viewsets, status
from rest_framework.authentication import SessionAuthentication, BasicAuthentication, BaseAuthentication
from rest_framework import exceptions
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from django.db.models import Q
from django.contrib.auth import login, logout
from . import models
from . import serializers



#
# Authentication and security
#

class QuietBasicAuthentication(BasicAuthentication):
    # disclaimer: once the user is logged in, this should NOT be used as a
    # substitute for SessionAuthentication, which uses the django session cookie,
    # rather it can check credentials before a session cookie has been granted.
    def authenticate_header(self, request):
        return 'xBasic realm="%s"' % self.www_authenticate_realm

class LoginView(APIView):
    authentication_classes = (QuietBasicAuthentication,)
 
    def post(self, request, *args, **kwargs):
        print('Received details: ', request.user)
        login(request, request.user)
        return 'Hello there'
        #return Response(serializers.UserSerializer(request.user).data)
 
    def delete(self, request, *args, **kwargs):
        logout(request)
        return Response({})


#class GetCSRF(Request):
#    self.name = 'Hello'
    #return Response('Done')    
    

#
# Search views
#


class ListTLC(generics.ListAPIView):
    serializer_class = serializers.SearchPage_Serializer

    def get_queryset(self):
        print(self.request.query_params.get('search_text'))
        search_text = self.request.query_params.get('search_text', '')
        return models.TLC.objects.filter(
            Q(tfcs__map__loinc__RELATEDNAMES2__icontains=search_text) | Q(tlcname__icontains=search_text)
        ).distinct()
        
    

#
# TLC detail page
#

class RetrieveUpdateDestroyTLC(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.DjangoModelPermissions,)
    queryset = models.TLC.objects.all()
    serializer_class = serializers.TLC_Serializer
    
    
    
#
# Testing views - for development
#

class ListCreateTLC(generics.ListCreateAPIView):
    queryset = models.TLC.objects.all()[:2]
    serializer_class =serializers.TLC_Serializer



class ListCreateLocation(generics.ListCreateAPIView):
    queryset = models.Locations.objects.all()[:10]
    serializer_class = serializers.Locations_Serializer
    
class RetrieveUpdateDestroyLocations(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Locations.objects.all()
    serializer_class = serializers.Locations_Serializer
    
class RetrieveUpdateDestroyMap(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Map.objects.all()
    serializer_class = serializers.Map_Serializer
    
class ListCreateForm(generics.ListCreateAPIView):
    queryset = models.Form.objects.all()[:5]
    serializer_class = serializers.Form_Serializer
    
class RetrieveUpdateDestroyForm(generics.ListCreateAPIView):
    queryset = models.Form.objects.all()
    serializer_class = serializers.Form_Serializer
    

# A full view

# from rest_framework import status
# from rest_framework.views import APIView
# from rest_framework.response import Response

class ListCreateTLCFull(APIView):
    
    def get(self, request, format=None):
        tlcs = models.TLC.objects.all() #.filter(id=self.kwargs['pk'])
        serializer = serializers.TLC_Serializer(tlcs, many=False)
        return Response(serializer.data)
        
    def post(self, request, format=None):
        serializer = serializers.TLC_Serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)