from django.conf.urls import url, include
# from django.views import generic
from .views import CreateView, DetailsView, UserViewSet
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


urlpatterns = [
    # url(r'^$', generic.RedirectView.as_view(url='/api/', permanent=False)),
    url(r'^', include(router.urls)),
    url(r'^$', get_schema_view()),
    url(r'^auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^auth/token/obtain/$', TokenObtainPairView.as_view()),
    url(r'^auth/token/refresh/$', TokenRefreshView.as_view()),
    # url(r'^echo/$', EchoView.as_view()),
    url(r'^entries/$', CreateView.as_view(), name="create"),
    url(r'^entries/(?P<pk>[0-9]+)/$', DetailsView.as_view(), name="details")
]

# urlpatterns = format_suffix_patterns(urlpatterns)