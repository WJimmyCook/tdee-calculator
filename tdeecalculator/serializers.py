from rest_framework import serializers
from tdeecalculator.apps.tdeemanager.models import Entry

class EntrySerializer(serializers.ModelSerializer):
	class Meta:
		model = Entry
		fields = ('user','date','calories','weight')