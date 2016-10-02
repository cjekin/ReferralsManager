from __future__ import unicode_literals

from django.db import models

# Create your models here.

class TestLibrary(models.Model):
    description = models.CharField(max_length=50)
    test_type = models.CharField(max_length=1)
    
    class Meta:
        db_table = "GlobalCodes_TestLibrary"
    
#class FlattenedTLC(models.Model):
#    tlc = models.ForeignKey
