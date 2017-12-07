# -*- coding: utf-8 -*-
from django.shortcuts import render
from django.utils.timezone import now
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from tdeecalculator.apps.tdeemanager.models import Entry
from tdeecalculator.apps.tdeemanager.serializers import EntrySerializer
import datetime

def home(request):
	today = datetime.date.today()
	return render(request, "tdeecalculator/index.html", {'today':today, 'now': now()})

def home_files(request, filename):
	return render(request, filename, {}, content_type="text/plain")

@csrf_exempt
def entry_list(request):
	"""
	List all entries 
	"""
	if request.method == 'GET':
		entries = Entry.objects.all()
		serializer = EntrySerializer(entries, many=True)
		return JsonResponse(serializer.data, safe=False)

	elif request.method == 'POST':
		data = JSONParser().parse(request)
		serializer = EntrySerializer(data=data)
		if serializer.is_valid():
			serializer.save()
			return JsonResponse(serializer.data, status=201)
		return JsonResponse(serializer.errors, status=400)

@csrf_exempt
def entry_detail(request, pk):
	"""
	Retrieve, update, or delete an entry
	"""
	try:
		entry = Entry.objects.get(pk=pk)
	except Entry.DoesNotExist:
		return httpResponse(status=404)

	if request.method == 'GET':
		serializer = EntrySerializer(entry)
		return JsonResponse(serializer.data)

	elif request.method == 'PUT':
		data = JSONParser().parse(request)
		serializer = EntrySerializer(entry, data=data)
		if serializer.is_valid():
			serializer.save()
			return JsonResponse(serializer.data)
		return JsonResponse(serializer.errors, status=400)

	elif request.method == 'DELETE':
		entry.delete()
		return httpResponse(status=204)

