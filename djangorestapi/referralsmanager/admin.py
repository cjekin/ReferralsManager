from django.contrib import admin

# Register your models here.
from .models import GlobalCodes_TEST, GlobalCodes_Locations

admin.site.register(GlobalCodes_TEST)
admin.site.register(GlobalCodes_Locations)
