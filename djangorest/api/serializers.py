from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Entry, Profile

class EntrySerializer(serializers.ModelSerializer):

	owner = serializers.ReadOnlyField(source='owner.username')

	class Meta:
		model = Entry
		fields = ('id', 'date', 'weight', 'calories','owner')

class UserSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = User
		fields = ('url', 'username', 'email')

class ProfileSerializer(serializers.ModelSerializer):
	owner = serializers.ReadOnlyField(source='owner.username')

	class Meta:
		model = Profile
		fields = ('startingWeight', 'goalWeight', 'weeklyWeightChange', 'owner')