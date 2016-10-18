from django.conf.urls import url
from django.views.decorators.csrf import csrf_exempt

from . import views

urlpatterns = [
    
    #url(r'^getcsrf$', views.GetCSRF),
    
    url(r'^login/$', views.LoginView.as_view(), name='login_view'),
    
    url(r'^tlcs/$', views.ListCreateTLC.as_view(), name='tlc_list'),
    url(r'^tlcs/(?P<pk>\d+)/$', 
        views.RetrieveUpdateDestroyTLC.as_view(), 
        name='tlc_detail'),
        
    url(r'^locations/$', views.ListCreateLocation.as_view(), name='location_list'),
    url(r'^locations/(?P<pk>\d+)/$', 
        views.RetrieveUpdateDestroyLocations.as_view(), 
        name='location_detail'),
        
    url(r'^map/(?P<pk>\d+)/$', views.RetrieveUpdateDestroyMap.as_view(), name='map_list'),
    url(r'^tfcs/$', views.ListCreateForm.as_view(), name='form_list'),
    url(r'^tfcs/(?P<pk>\d+)/$', views.RetrieveUpdateDestroyForm.as_view(), name='form_list'),
    
    #url(r'^search/(?P<search_text>.+)/$', csrf_exempt(views.ListTLC.as_view()), name='search_test'),
    url(r'^search/$', csrf_exempt(views.ListTLC.as_view()), name='search_test'),
    
    ]