# -*- coding: utf-8 -*-
from django.db import models
from django.db.models.signals import post_save
from django.conf import settings
from django.utils.translation import ugettext_lazy as _
from django.dispatch import receiver
import datetime

from . import managers

class Profile(models.Model):
	# Relations
	user = models.OneToOneField(
		settings.AUTH_USER_MODEL,
		related_name="profile",
		verbose_name=_("user"),
		on_delete=models.DO_NOTHING
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

class Entry(models.Model):
	# Relations
	user = models.ForeignKey(
		Profile,
		related_name="entries",
		verbose_name=_("user"),
		on_delete=models.CASCADE
		)
	# Attributes - Mandatory
	date = models.DateField(
		verbose_name=_("Date"),
		default=datetime.date.today
		)
	calories = models.FloatField(
		verbose_name=_("Calories")
		)
	weight = models.FloatField(
		verbose_name=_("Weight")
		)
	# Attributes - Optional
	# Object Manager
	objects = managers.EntryManager()
	# Custom Properties
	# Methods

	# Meta and String
	class Meta:
		verbose_name=_("Entry")
		verbose_name_plural=_("Entries")
		ordering = ("user", "date")
		unique_together = ("user", "date")

	def __str__(self):
		return "%s - %s" % (self.user, self.date)
			


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_profile_for_new_user(sender, created, instance, **kwargs):
	if created:
		profile = Profile(user=instance)
		profile.save()
		