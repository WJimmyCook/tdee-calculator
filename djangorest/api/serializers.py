from rest_framework import serializers
from .models import Entry

class EntrySerializer(serializers.ModelSerializer):

	owner = serializers.ReadOnlyField(source='owner.username')

	class Meta:
		model = Entry
		fields = ('id', 'date', 'weight', 'calories','owner')