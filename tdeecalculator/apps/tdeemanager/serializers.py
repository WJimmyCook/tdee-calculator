from rest_framework import serializers
from tdeecalculator.apps.tdeemanager.models import Entry

class EntrySerializer(serializers.ModelSerializer):
	# date = serializers.DateField(required=True)
	# calories = serializers.FloatField(required=True)
	# weight = serializers.FloatField(required=True)

	# def create(self, validated_data):
	# 	return Entry.objects.create(**validated_data)

	# def update(self, instance, validated_data):
	# 	instance.date = validated_data.get('date', instance.date)
	# 	instance.calories = validated_data.get('calories', instance.calories)
	# 	instance.weight = validated_data.get('weight', instance.weight)
	# 	instance.save()
	# 	return instance
	class Meta:
		model = Entry
		fields = ('user','date','calories','weight')