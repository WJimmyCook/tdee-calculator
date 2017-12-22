from rest_framework import generics, permissions, viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .permissions import IsOwner
from django.contrib.auth.models import User
from .serializers import EntrySerializer, UserSerializer, ProfileSerializer
from .models import Entry, Profile

class CreateView(generics.ListCreateAPIView):
    """This class defines the create behavior of our rest api."""
    # queryset = Entry.objects.all()
    serializer_class = EntrySerializer
    permission_classes = [IsOwner]

    def perform_create(self, serializer):
        """Save the post data when creating a new bucketlist."""
        serializer.save(owner=self.request.user)
    def get_queryset(self):
        user = self.request.user
        return Entry.objects.filter(owner=user)

class DetailsView(generics.RetrieveUpdateDestroyAPIView):
    """This class handles the http GET, PUT and DELETE requests."""
    queryset = Entry.objects.all()
    serializer_class = EntrySerializer
    permission_classes = [IsOwner]

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = ()

class UserCreate(APIView):

    def post(self, request, format='json'):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CreateProfileView(generics.ListCreateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [IsOwner]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    # def get_queryset(self):
    #     user = self.request.user
    #     return Entry.objects.filter(owner=user)

class DetailsProfileView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [IsOwner]
    lookup_field = 'owner_id'