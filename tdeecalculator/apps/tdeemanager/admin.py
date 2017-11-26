# -*- coding: utf-8 -*-
from django.contrib import admin
from . import models

class EntriesInLine(admin.TabularInline):
	model = models.Entry
	extra = 0
 
 
@admin.register(models.Profile)
class ProfileAdmin(admin.ModelAdmin):
 
    list_display = ("username","_entries")
 
    search_fields = ["user__username"]

    inlines = [
    	EntriesInLine
    ]

    def _entries(self, obj):
    	return obj.entries.all().count()