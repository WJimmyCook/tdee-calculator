from rest_framework import generics, permissions, viewsets
from .permissions import IsOwner
from django.contrib.auth.models import User
from .serializers import EntrySerializer, UserSerializer, ProfileSerializer
from .models import Entry, Profile

class CreateView(generics.ListCreateAPIView):
    """This class defines the create behavior of our rest api."""
    queryset = Entry.objects.all()
    serializer_class = EntrySerializer
    permission_classes = ()

    def perform_create(self, serializer):
        """Save the post data when creating a new bucketlist."""
        serializer.save(owner=self.request.user)

class DetailsView(generics.RetrieveUpdateDestroyAPIView):
    """This class handles the http GET, PUT and DELETE requests."""
    queryset = Entry.objects.all()
    serializer_class = EntrySerializer
    permission_classes = ()

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class CreateProfileView(generics.ListCreateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = ()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class DetailsProfileView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Entry.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = ()