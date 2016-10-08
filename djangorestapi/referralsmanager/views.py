from rest_framework import generics

from . import models
from . import serializers

class ListCreateTLC(generics.ListCreateAPIView):
    queryset = models.TLC.objects.all()[:2]
    serializer_class =serializers.TLC_Serializer

class RetrieveUpdateDestroyTLC(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.TLC.objects.all()
    serializer_class = serializers.TLC_Serializer

class ListCreateLocation(generics.ListCreateAPIView):
    queryset = models.Locations.objects.all()[:10]
    serializer_class = serializers.Locations_Serializer
    
class RetrieveUpdateDestroyLocations(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Locations.objects.all()
    serializer_class = serializers.Locations_Serializer
    
class RetrieveUpdateDestroyMap(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Map.objects.all()
    serializer_class = serializers.Map_Serializer
    

# A full view

# from rest_framework import status
# from rest_framework.views import APIView
# from rest_framework.response import Response

# class ListCreateTLC(APIView):
#     def get(self, request, format=None):
#         tlcs = models.TLC.objects.all()[:10]
#         serializer = serializers.TLC_Serializer(tlcs, many=True)
#         return Response(serializer.data)
        
#     def post(self, request, format=None):
#         serializer = serializers.TLC_Serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         serializer.save()
#         return Response(serializer.data, status=status.HTTP_201_CREATED)