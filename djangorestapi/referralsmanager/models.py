from django.db import models




class Form(models.Model):
    origin = models.CharField(max_length=20)
    tfc = models.CharField(max_length=4)
    wrksection = models.CharField(max_length=1)
    testname = models.CharField(max_length=50)
    units = models.CharField(max_length=20)
    functions = models.CharField(max_length=10)
    reflab = models.CharField(max_length=3)
    ref = models.ForeignKey('Reflabs', models.SET_NULL, blank=True, null=True, )
    flags = models.CharField(max_length=10)
    repsection = models.CharField(max_length=1)
    dontwaitforme = models.CharField(max_length=1)
    rownum = models.IntegerField()
    
    class Meta:
        db_table = "GlobalCodes_FORM"
        unique_together = ('origin', 'tfc')
        
    def __str__(self):
        return '{},{}'.format(self.origin,self.tfc)


class TLC(models.Model):
    origin = models.CharField(max_length=20)
    tlc = models.CharField(max_length=4)
    tlctype = models.CharField(max_length=1)
    fixedprice = models.CharField(max_length=1, null=True)
    printlabel = models.CharField(max_length=1, null=True)
    specifiedprof = models.CharField(max_length=1, null=True)
    securitylevel = models.IntegerField(null=True)
    queryflag = models.CharField(max_length=1, null=True)
    tlcname = models.CharField(max_length=25)
    fee1 = models.DecimalField(max_digits=6, decimal_places=2, null=True)
    
    tfcs = models.ManyToManyField(Form, through='Flat')
    
    class Meta:
        db_table = "GlobalCodes_TLC"
        unique_together = ('origin', 'tlc')
        
    def __str__(self):
        return '{},{}'.format(self.origin,self.tlc)
        
        
class Flat(models.Model):
    origin = models.CharField(max_length=20)
    tlc_code = models.CharField(max_length=4)
    tfc_code = models.CharField(max_length=4)
    
    tlc = models.ForeignKey('TLC')
    tfc = models.ForeignKey('Form')
    
    class Meta:
        db_table = "GlobalCodes_FLAT"
        unique_together = ('tlc','tfc')
        
    def __str__(self):
        return '{}->{}:{}'.format(self.tlc_code, self.tfc_code, self.tfc.testname)
        
        
class Reflabs(models.Model):
    origin = models.CharField(max_length=20)
    reflab_code = models.CharField(max_length=5)
    reflab_name = models.CharField(max_length=50)
    
    class Meta:
        db_table = "GlobalCodes_REFLABS"
        
    def __str__(self):
        return '{}: {}'.format(self.reflab_code, self.reflab_name)
        
    
    
class Locations(models.Model):
    subsectioncode = models.CharField(max_length=50)
    subsection = models.CharField(max_length=100)
    department = models.CharField(max_length=50)
    location = models.CharField(max_length=100)
    address = models.TextField(blank=True)
    postcode = models.CharField(max_length=20, blank=True)
    telephone = models.CharField(max_length=255, blank=True)
    contact = models.CharField(max_length=255, blank=True)
    url = models.CharField(max_length=255, blank=True)
    notes = models.TextField(blank=True)
    halo = models.BooleanField()
    wsl = models.BooleanField()
    referral = models.BooleanField()
    dynamics_code = models.CharField(max_length=10, blank=True)
    active = models.BooleanField()
    
    class Meta:
        db_table = "GlobalCodes_Locations"
        
    def __str__(self):
        return '{}, {}'.format(self.subsection,self.location)
    
    
class Map(models.Model):
    origin = models.CharField(max_length=20)
    tfc = models.CharField(max_length=4)
    loinc = models.ForeignKey('LOINC', models.SET_NULL, blank=True, null=True,related_name="loinc")
    container = models.CharField(max_length=50)
    loc1 = models.ForeignKey('Locations', models.SET_NULL, blank=True, null=True, related_name='loc1',)
    loc2 = models.ForeignKey('Locations', models.SET_NULL, blank=True, null=True, related_name='loc2',)
    form = models.ForeignKey('Form', models.SET_NULL, blank=True, null=True,)
    
    result_type = models.CharField(max_length=20)
    
    class Meta:
        db_table = "GlobalCodes_Map"
        unique_together = ('origin', 'tfc')
        
    def __str__(self):
        return '{}:{}'.format(self.origin,self.tfc)
        

class LabGuide(models.Model):
    mapid = models.ForeignKey('Map', models.SET_NULL, blank=True, null=True,)
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
    
    
class LOINC(models.Model):
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
    DefinitionDescription = models.TextField()
    STATUS = models.CharField(max_length=11)
    CONSUMER_NAME = models.CharField(max_length=255)
    CLASSTYPE = models.IntegerField()
    FORMULA = models.TextField()
    SPECIES = models.CharField(max_length=20)
    EXMPL_ANSWERS = models.TextField()
    SURVEY_QUEST_TEXT = models.TextField()
    SURVEY_QUEST_SRC = models.CharField(max_length=50)
    UNITSREQUIRED = models.CharField(max_length=1)
    SUBMITTED_UNITS = models.CharField(max_length=30)
    RELATEDNAMES2 = models.TextField()
    SHORTNAME = models.CharField(max_length=40)
    ORDER_OBS = models.CharField(max_length=15)
    CDISC_COMMON_TESTS = models.TextField()
    HL7_FIELD_SUBFIELD_ID = models.CharField(max_length=50)
    EXTERNAL_COPYRIGHT_NOTICE = models.TextField()
    EXAMPLE_UNITS = models.CharField(max_length=255)
    LONG_COMMON_NAME = models.CharField(max_length=255)
    UnitsAndRange = models.TextField()
    DOCUMENT_SECTION = models.CharField(max_length=255)
    EXAMPLE_UCUM_UNITS = models.CharField(max_length=255)
    EXAMPLE_SI_UCUM_UNITS = models.CharField(max_length=255)
    STATUS_REASON = models.CharField(max_length=9)
    STATUS_TEXT = models.TextField()
    CHANGE_REASON_PUBLIC = models.TextField()
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
        
    def __str__(self):
        return self.LONG_COMMON_NAME
        
        
        
        
# Learning stuff: Generic ManyToMany
# https://docs.djangoproject.com/en/1.10/topics/db/examples/many_to_many/
class Publication(models.Model):
    title = models.CharField(max_length=30)

    def __str__(self):              # __unicode__ on Python 2
        return self.title

    class Meta:
        ordering = ('title',)

class Article(models.Model):
    headline = models.CharField(max_length=100)
    publications = models.ManyToManyField(Publication)

    def __str__(self):              # __unicode__ on Python 2
        return self.headline

    class Meta:
        ordering = ('headline',)
    

# Learning stuff: Custom link table ManyToMany
# https://docs.djangoproject.com/en/1.10/ref/models/fields/#django.db.models.ManyToManyField

class Person(models.Model):
    name = models.CharField(max_length=50)
    
    def __str__(self):
        return self.name

class Group(models.Model):
    name = models.CharField(max_length=128)
    members = models.ManyToManyField(
        Person,
        through='Membership',
        through_fields=('group', 'person'),
    )
    
    def __str__(self):
        return self.name

class Membership(models.Model):
    group = models.ForeignKey(Group, on_delete=models.CASCADE)
    person = models.ForeignKey(Person, on_delete=models.CASCADE)
    inviter = models.ForeignKey(
        Person,
        on_delete=models.CASCADE,
        related_name="membership_invites",
    )
    invite_reason = models.CharField(max_length=64)
    

