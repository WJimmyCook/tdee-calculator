# -*- coding: utf-8 -*-
from django.db import models
from django.db.models.signals import post_save
from django.conf import settings
from django.utils.translation import ugettext_lazy as _
from django.dispatch import receiver

from . import managers

class Profile(models.Model):
	# Relations
	user = models.OneToOneField(
		settings.AUTH_USER_MODEL,
		related_name="profile",
		verbose_name=_("user")
		)
	# Attributes - Mandatory
	# Attributes - optional
	starting_weight = models.FloatField(
		null=True,
		verbose_name=_("Starting weight")
		)
	goal_weight = models.FloatField(
		null=True,
		verbose_name=_("Goal weight")
		)
	weekly_weight_change = models.FloatField(
		null=True,
		verbose_name=_("Goal weight loss per week")
		)
	# Object Manager
	objects = managers.ProfileManager()

	# Custom Properties
	@property
	def username(self):
		return self.user.username

	# Methods

	# Meta and String
	class Meta:
		verbose_name = _("Profile")
		verbose_name_plural = _("Profiles")
		ordering = ("user",)

	def __str__(self):
		return self.user.username

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_profile_for_new_user(sender, created, instance, **kwargs):
	if created:
		profile = Profile(user=instance)
		profile.save()
		