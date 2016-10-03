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
    loinc = models.ForeignKey('LOINC_Main', models.SET_NULL, blank=True, null=True,)
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
    
    class Meta:
        db_table = "GlobalCodes_REFLABS"
        

class GlobalCodes_LabGuide(models.Model):
    mapid = models.ForeignKey('GlobalCodes_Map', models.SET_NULL, blank=True, null=True,)
    sample_type = models.CharField(max_length=50)
    published_tat = models.CharField(max_length=20)
    volume_ml = models.DecimalField(max_digits=6, decimal_places=3)
    frozen = models.BooleanField()
    suitable_for_preanalytics = models.BooleanField()
    sample_detail = models.TextField()
    special_handling = models.TextField()
    warnings = models.CharField(max_length=140)
    assay_frequency = models.CharField(max_length=50)
    method_of_sending = models.TextField()
    
    class Meta:
        db_table = "GlobalCodes_LabGuide"
    
    
class LOINC_Main(models.Model):
    LOINC_NUM = models.CharField(max_length=10, unique=True, db_index=True, primary_key=True,)
    COMPONENT = models.CharField(max_length=255)
    PROPERTY = models.CharField(max_length=30)
    TIME_ASPCT = models.CharField(max_length=15)
    SYSTEM = models.CharField(max_length=100)
    SCALE_TYP = models.CharField(max_length=30)
    METHOD_TYP = models.CharField(max_length=50)
    CLASS = models.CharField(max_length=20)
    SOURCE = models.CharField(max_length=8)
    VersionLastChanged = models.CharField(max_length=10)
    CHNG_TYPE = models.CharField(max_length=3)
    DefinitionDescription = models.CharField(max_length=1)
    STATUS = models.CharField(max_length=11)
    CONSUMER_NAME = models.CharField(max_length=255)
    CLASSTYPE = models.IntegerField()
    FORMULA = models.CharField(max_length=1)
    SPECIES = models.CharField(max_length=20)
    EXMPL_ANSWERS = models.CharField(max_length=1)
    SURVEY_QUEST_TEXT = models.CharField(max_length=1)
    SURVEY_QUEST_SRC = models.CharField(max_length=50)
    UNITSREQUIRED = models.CharField(max_length=1)
    SUBMITTED_UNITS = models.CharField(max_length=30)
    RELATEDNAMES2 = models.CharField(max_length=1)
    SHORTNAME = models.CharField(max_length=40)
    ORDER_OBS = models.CharField(max_length=15)
    CDISC_COMMON_TESTS = models.CharField(max_length=1)
    HL7_FIELD_SUBFIELD_ID = models.CharField(max_length=50)
    EXTERNAL_COPYRIGHT_NOTICE = models.CharField(max_length=1)
    EXAMPLE_UNITS = models.CharField(max_length=255)
    LONG_COMMON_NAME = models.CharField(max_length=255)
    UnitsAndRange = models.CharField(max_length=1)
    DOCUMENT_SECTION = models.CharField(max_length=255)
    EXAMPLE_UCUM_UNITS = models.CharField(max_length=255)
    EXAMPLE_SI_UCUM_UNITS = models.CharField(max_length=255)
    STATUS_REASON = models.CharField(max_length=9)
    STATUS_TEXT = models.CharField(max_length=1)
    CHANGE_REASON_PUBLIC = models.CharField(max_length=1)
    COMMON_TEST_RANK = models.IntegerField()
    COMMON_ORDER_RANK = models.IntegerField()
    COMMON_SI_TEST_RANK = models.IntegerField()
    HL7_ATTACHMENT_STRUCTURE = models.CharField(max_length=15)
    EXTERNAL_COPYRIGHT_LINK = models.CharField(max_length=255)
    PanelType = models.CharField(max_length=50)
    AskAtOrderEntry = models.CharField(max_length=255)
    AssociatedObservations = models.CharField(max_length=255)
    
    class Meta:
        db_table = "LOINC_Main"
    

    
    

