from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth.models import User
from .models import Entry, Profile

class EntrySerializer(serializers.ModelSerializer):

	owner = serializers.ReadOnlyField(source='owner.username')

	class Meta:
		model = Entry
		fields = ('id', 'date', 'weight', 'calories','owner')

class UserSerializer(serializers.ModelSerializer):
	email = serializers.EmailField(
		required=True, 
		validators=[UniqueValidator(queryset=User.objects.all())]
		)
	username = serializers.CharField(
            validators=[UniqueValidator(queryset=User.objects.all())]
            )
	password = serializers.CharField(min_length=4, write_only=True)

	def create(self, validated_data):
		user = User.objects.create_user(validated_data['username'],validated_data['email'],validated_data['password'])
		return user

	class Meta:
		model = User
		fields = ('id', 'username', 'email', 'password')

class ProfileSerializer(serializers.ModelSerializer):
	owner = serializers.ReadOnlyField(source='owner.username')
	ownerId = serializers.ReadOnlyField(source='owner.id')
	class Meta:
		model = Profile
		fields = ('id','startingWeight', 'goalWeight', 'weeklyWeightChange', 'owner', 'ownerId')