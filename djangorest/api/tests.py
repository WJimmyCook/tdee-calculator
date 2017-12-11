from rest_framework.test import APIClient
from rest_framework import status
from django.urls import reverse
from django.contrib.auth.models import User
from django.test import TestCase
from .models import Entry

class ModelTestCase(TestCase):
    """This class defines the test suite for the entry model."""

    def setUp(self):
    	user = User.objects.create(username="nerd")
    	self.date = "2016-12-12"
    	self.entry = Entry(date=self.date, owner=user, weight=123, calories=2200)

    def test_model_can_create_a_entry(self):
        """Test the entry model can create a entry."""
        old_count = Entry.objects.count()
        self.entry.save()
        new_count = Entry.objects.count()
        self.assertNotEqual(old_count, new_count)

    def test_model_returns_readable_representation(self):
        """Test a readable string is returned for the model instance."""
        self.assertEqual(str(self.entry), self.date)

class ViewTestCase(TestCase):

	def setUp(self):
		user = User.objects.create(username="nerd")

		self.client = APIClient()
		self.client.force_authenticate(user=user)

		self.entry_data = {'date':'2014-12-11', 'weight':140, 'calories':2198, 'owner': user.id}
		self.response = self.client.post(
			reverse('create'),
			self.entry_data,
			format="json")

	def test_api_can_create_a_entry(self):
		self.assertEqual(self.response.status_code, status.HTTP_201_CREATED)

	def test_authorization_is_enforced(self):
		new_client = APIClient()
		res = new_client.get('/entries/', kwargs={'pk':1}, format="json")
		self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)

	def test_api_can_get_a_entry(self):
		"""Test the api can get a given entry."""
		entry = Entry.objects.get()
		response = self.client.get(
            reverse('details',
            kwargs={'pk': entry.id}), format="json")
		self.assertEqual(response.status_code, status.HTTP_200_OK)
		self.assertContains(response, entry)

	def test_api_can_update_entry(self):
		"""Test the api can update a given entry."""
		entry = Entry.objects.get()
		change_entry = {'weight': 123,'calories':2112,'date':'2001-12-12'}
		res = self.client.put(
            reverse('details', kwargs={'pk': entry.id}),
            change_entry, format='json'
        )
		self.assertEqual(res.status_code, status.HTTP_200_OK)

	def test_api_can_delete_entry(self):
		"""Test the api can delete a entry."""
		entry = Entry.objects.get()
		response = self.client.delete(
            reverse('details', kwargs={'pk': entry.id}),
            format='json',
            follow=True)
		self.assertEquals(response.status_code, status.HTTP_204_NO_CONTENT)