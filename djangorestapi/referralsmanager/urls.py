from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^tlcs/$', views.ListCreateTLC.as_view(), name='tlc_list'),
    url(r'^tlcs/(?P<pk>\d+)/$', 
        views.RetrieveUpdateDestroyTLC.as_view(), 
        name='tlc_detail'),
    url(r'^locations/$', views.ListCreateLocation.as_view(), name='location_list'),
    url(r'^locations/(?P<pk>\d+)/$', 
        views.RetrieveUpdateDestroyLocations.as_view(), 
        name='location_detail'),
    url(r'^map/(?P<pk>\d+)/$', views.RetrieveUpdateDestroyMap.as_view(), name='map_list'),
    ]