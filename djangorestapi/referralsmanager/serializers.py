from rest_framework import serializers

from . import models

#
# Search Page Serializers
#

class SearchPage_Serializer(serializers.ModelSerializer):
    tfcs = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    
    class Meta: 
        fields = (
            'id','origin', 'tlc', 'tlctype','fixedprice','printlabel','specifiedprof',
            'securitylevel','queryflag','tlcname','fee1',
            'tfcs'
            )
        model = models.TLC


#
# Testing things out - Serializers
#

class Locations_Serializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id','subsectioncode','subsection','department','location','address','postcode','telephone','contact',
            'url','notes','halo','wsl','referral','dynamics_code','active',
            )
        read_only_fields = ('id',)
        model = models.Locations

class LOINC_Serializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'LOINC_NUM','LONG_COMMON_NAME','COMPONENT'
            )
        model = models.LOINC

class Map_Serializer(serializers.ModelSerializer):
    loinc = serializers.StringRelatedField(many=False, read_only=True) #LOINC_Serializer(many=False, read_only=True)
    loc1 = Locations_Serializer(many=False, read_only=True)
    loc2 = serializers.StringRelatedField(many=False, read_only=True) #Locations_Serializer(many=False, read_only=True)
    
    class Meta:
        fields = (
            'origin','tfc','loinc','loc1','loc2','container','result_type'
            )
        read_only_fields = ('origin','tfc')
        model = models.Map
        

class Form_Serializer(serializers.ModelSerializer):
    map_set = Map_Serializer(many=True, read_only=True)
    
    class Meta:
        fields = (
            'origin','tfc','wrksection','testname','units','functions','reflab',
            'ref','flags','repsection','dontwaitforme','rownum','map_set'
            )
        model = models.Form


class TLC_Serializer(serializers.ModelSerializer):
    tfcs = Form_Serializer(many=True, read_only=True)
    
    class Meta: 
        fields = (
            'id','origin', 'tlc', 'tlctype','fixedprice','printlabel','specifiedprof',
            'securitylevel','queryflag','tlcname','fee1',
            'tfcs'
            )
        model = models.TLC