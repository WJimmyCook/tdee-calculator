from django.db import models
from django.db.models.signals import post_save
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from django.dispatch import receiver
from django.db.models.signals import post_save
from django.conf import settings

class Entry(models.Model):
	date = models.DateField()
	weight = models.FloatField()
	calories = models.FloatField()
	owner = models.ForeignKey('auth.User', related_name='entries', on_delete=models.CASCADE)

	def __str__(self):
		return "{}".format(self.date)

class Profile(models.Model):
	owner = models.OneToOneField(
		settings.AUTH_USER_MODEL,
		related_name="profile",
		on_delete=models.CASCADE
		)

	startingWeight = models.FloatField(default=None, blank=True, null=True)
	goalWeight = models.FloatField(default=None, blank=True, null=True)
	weeklyWeightChange = models.FloatField(default=None, blank=True, null=True)

	@property
	def username(self):
		return self.user.username
	@property
	def ownerId(self):
		return self.user.id

	def __str__(self):
		return self.user.username

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
	if created:
		Token.objects.create(user=instance)

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_profile_for_new_user(sender, instance, created, **kwargs):
	if created:
		profile = Profile(owner=instance)
		profile.save()
	