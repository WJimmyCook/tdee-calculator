from django.conf.urls import url, include
# from django.views import generic
from .views import CreateView, DetailsView, UserViewSet, CreateProfileView, DetailsProfileView
# from rest_framework.urlpatterns import format_suffix_patterns
# from rest_framework import status, serializers, views
# from rest_framework.response import Response
# from rest_framework.decorators import api_view
from rest_framework import routers
from rest_framework.schemas import get_schema_view
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

router = routers.DefaultRouter()
router.register(r'users', UserViewSet)

user_list = UserViewSet.as_view({
	'get': 'list',
	'post': 'create'
	})

user_detail = UserViewSet.as_view({
	'get': 'retrieve',
	'put': 'update',
	'patch': 'partial_update',
	'delete': 'detroy'
	})


urlpatterns = [
    # url(r'^$', generic.RedirectView.as_view(url='/api/', permanent=False)),
    url(r'^', include(router.urls)),
    url(r'^$', get_schema_view()),
    url(r'^auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^auth/token/obtain/$', TokenObtainPairView.as_view()),
    url(r'^auth/token/refresh/$', TokenRefreshView.as_view()),
    url(r'^users/$', user_list, name="user-list"),
    url(r'^users/(?P<pk>[0-9]+)/$', user_detail, name="user-detail"),
    url(r'^entries/$', CreateView.as_view(), name="create"),
    url(r'^entries/(?P<pk>[0-9]+)/$', DetailsView.as_view(), name="details"),
    url(r'^profile/$', CreateProfileView.as_view(), name="create-profile"),
    url(r'^profile/(?P<pk>[0-9]+)/$', DetailsProfileView.as_view(), name="details-profile")
]

# urlpatterns = format_suffix_patterns(urlpatterns)