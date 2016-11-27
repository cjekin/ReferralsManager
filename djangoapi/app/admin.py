from django.contrib import admin

admin.site.site_header = 'Referrals Manager Admin'

# Register your models here.
from .models import TLC, Form, Flat

class TLCAdmin(admin.ModelAdmin):
    pass

class FormAdmin(admin.ModelAdmin):
    pass

class FlatAdmin(admin.ModelAdmin):
    pass

admin.site.register(TLC, TLCAdmin)
admin.site.register(Form, FormAdmin)
admin.site.register(Flat, FlatAdmin)
