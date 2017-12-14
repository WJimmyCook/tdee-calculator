from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Entry

class EntrySerializer(serializers.ModelSerializer):

	owner = serializers.ReadOnlyField(source='owner.username')

	class Meta:
		model = Entry
		fields = ('id', 'date', 'weight', 'calories','owner')


# class MessageSerializer(serializers.Serializer):
#     message = serializers.CharField()

class UserSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = User
		fields = ('url', 'username', 'email')