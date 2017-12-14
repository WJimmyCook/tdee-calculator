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

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
	if created:
		Token.objects.create(user=instance)
