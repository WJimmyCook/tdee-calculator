from rest_framework import generics, permissions, viewsets
from .permissions import IsOwner
from django.contrib.auth.models import User
from .serializers import EntrySerializer, UserSerializer
from .models import Entry

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

# class EchoView(views.APIView):
#     def post(self, request, *args, **kwargs):
#         serializer = MessageSerializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         return Response(serializer.data, status=status.HTTP_201_CREATED)


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer