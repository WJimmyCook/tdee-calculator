# -*- coding: utf-8 -*-
from django.conf.urls import include, url
from django.contrib import admin
from .views import home, home_files, entry_list, entry_detail

urlpatterns = (
	url(r'^accounts/', include('allauth.urls')),
    url(r'^(?P<filename>(robots.txt)|(humans.txt))$', home_files, name='home-files'),
    url(r'^$', home, name='home'),
    url(r'^admin/', admin.site.urls),
    url(r'^entries/$', entry_list),
    url(r'^entries/(?P<pk>[0-9]+)/$', entry_detail),
)