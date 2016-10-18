from rest_framework import generics, mixins, permissions, viewsets
from django.contrib.auth.models import User
from django.db.models import Q
from . import models
from . import serializers


#
# Authentication and security
#

class GetCSRF(request):
    
    

#
# Search views
#

class ListTLC(generics.ListAPIView):
    serializer_class = serializers.SearchPage_Serializer

    def get_queryset(self):
        search_text = self.kwargs['search_text']
        return models.TLC.objects.filter(
            Q(tfcs__map__loinc__RELATEDNAMES2__icontains=search_text) | Q(tlcname__icontains=search_text)
        )
    

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

# class ListCreateTLCFull(APIView):
    
#     def get(self, request, format=None):
#         tlcs = models.TLC.objects.all() #.filter(id=self.kwargs['pk'])
#         serializer = serializers.TLC_Serializer(tlcs, many=False)
#         return Response(serializer.data)
        
#     def post(self, request, format=None):
#         serializer = serializers.TLC_Serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         serializer.save()
#         return Response(serializer.data, status=status.HTTP_201_CREATED)