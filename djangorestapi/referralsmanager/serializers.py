from rest_framework import serializers

from . import models


class Form_Serializer(serializers.ModelSerializer):
    
    class Meta:
        fields = (
            'origin','tfc','wrksection','testname','units','functions','reflab',
            'ref','flags','repsection','dontwaitforme','rownum',
            )
        model = models.Form


class TLC_Serializer(serializers.ModelSerializer):
    tfcs = Form_Serializer(many=True, read_only=True)
    
    class Meta: 
        fields = (
            'origin', 'tlc', 'tlctype','fixedprice','printlabel','specifiedprof',
            'securitylevel','queryflag','tlcname','fee1',
            'tfcs'
            )
        model = models.TLC
        
        

class Locations_Serializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id','subsectioncode','subsection','department','location','address','postcode','telephone','contact',
            'url','notes','halo','wsl','referral','dynamics_code','active',
            )
        read_only_fields = ('id',)
        model = models.Locations
        
        
class Map_Serializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'origin','tfc','loinc','container','loc1','loc2','form','result_type'
            )
        read_only_fields = ('origin','tfc')
        model = models.Map
        
        