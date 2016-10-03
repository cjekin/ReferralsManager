from __future__ import unicode_literals

from django.db import models

# Create your models here.

class GlobalCodes_TEST(models.Model):
    origin = models.CharField(max_length=20)
    tlc = models.CharField(max_length=4)
    tlctype = models.CharField(max_length=1)
    tlcname = models.CharField(max_length=50)
    fee1 = models.DecimalField(max_digits=6, decimal_places=2)
    
    class Meta:
        db_table = "GlobalCodes_TEST"
    
    
class GlobalCodes_Locations(models.Model):
    subsectioncode = models.CharField(max_length=50)
    subsection = models.CharField(max_length=100)
    department = models.CharField(max_length=50)
    location = models.CharField(max_length=100)
    address = models.TextField()
    postcode = models.CharField(max_length=20)
    telephone = models.CharField(max_length=255)
    contact = models.CharField(max_length=255)
    url = models.CharField(max_length=255)
    notes = models.TextField()
    halo = models.BooleanField()
    wsl = models.BooleanField()
    referral = models.BooleanField()
    dynamics_code = models.CharField(max_length=10)
    active = models.BooleanField()
    
    class Meta:
        db_table = "GlobalCodes_Locations"
    
    
class GlobalCodes_Map(models.Model):
    origin = models.CharField(max_length=20)
    tfc = models.CharField(max_length=4)
    loinc = models.CharField(max_length=20)
    container = models.CharField(max_length=50)
    loc1 = models.ForeignKey('GlobalCodes_Locations', models.SET_NULL, blank=True, null=True, related_name='loc1',)
    loc2 = models.ForeignKey('GlobalCodes_Locations', models.SET_NULL, blank=True, null=True, related_name='loc2',)
    form = models.ForeignKey('GlobalCodes_FORM', models.SET_NULL, blank=True, null=True,)
    
    result_type = models.CharField(max_length=20)
    
    class Meta:
        db_table = "GlobalCodes_Map"
        
        
class GlobalCodes_FORM(models.Model):
    origin = models.CharField(max_length=20)
    tfc = models.CharField(max_length=4)
    wrksection = models.CharField(max_length=1)
    testname = models.CharField(max_length=50)
    units = models.CharField(max_length=20)
    functions = models.CharField(max_length=10)
    reflab = models.CharField(max_length=3)
    ref = models.ForeignKey('GlobalCodes_REFLABS', models.SET_NULL, blank=True, null=True, )
    flags = models.CharField(max_length=10)
    repsection = models.CharField(max_length=1)
    dontwaitforme = models.CharField(max_length=1)
    rownum = models.IntegerField()
    
    class Meta:
        db_table = "GlobalCodes_FORM"
    
class GlobalCodes_FLAT(models.Model):
    origin = models.CharField(max_length=20)
    tlc = models.CharField(max_length=4)
    tfc = models.CharField(max_length=4)
    tlc = models.ForeignKey('GlobalCodes_TEST', models.SET_NULL, blank=True, null=True,)
    form = models.ForeignKey('GlobalCodes_FORM', models.SET_NULL, blank=True, null=True,)
    
    class Meta:
        db_table = "GlobalCodes_FLAT"
        
class GlobalCodes_REFLABS(models.Model):
    origin = models.CharField(max_length=20)
    reflab_code = models.CharField(max_length=5)
    reflab_name = models.CharField(max_length=50)
    
    

