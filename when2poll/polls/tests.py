from django.test import TestCase
from django.utils import timezone
from .models import AvailabilityPoll, DateTimeRange
from datetime import datetime, timedelta
from django.contrib.auth import get_user_model

class AvailabilityPollTestCase(TestCase):
    def setUp(self):
        now = datetime.utcnow()+timedelta(days=7)
        formatted_time = now.strftime("%Y-%m-%dT%H:%MZ")
        self.user = get_user_model().objects.create_user(
            full_name='test user',
            email='testuser@example.com',
            password='testpass'
        )
        self.poll = AvailabilityPoll.objects.create(
            name='Test poll',
            description='This is a test poll',
            duration="1:00",
            deadline=formatted_time,
            owner=self.user
        )

    def test_is_expired(self):
        self.assertFalse(self.poll.is_expired())
        self.poll.deadline = timezone.now() - timezone.timedelta(hours=1)
        self.assertTrue(self.poll.is_expired())

    def test_get_participant_count(self):
        self.assertEqual(self.poll.get_participant_count(), 0)
        self.poll.participants.add(self.user)
        self.assertEqual(self.poll.get_participant_count(), 1)


class DateTimeRangeTestCase(TestCase):
    def setUp(self):
        now = datetime.utcnow()+timedelta(days=7)
        formatted_time = now.strftime("%Y-%m-%dT%H:%MZ")
        self.user = get_user_model().objects.create_user(
            full_name='test user',
            email='testuser@example.com',
            password='testpass'
        )
        self.poll = AvailabilityPoll.objects.create(
            name='Test poll',
            description='This is a test poll',
            duration="1:00",
            deadline=formatted_time,
            owner=self.user
        )
        self.range = DateTimeRange.objects.create(
            start_time=timezone.now(),
            end_time=formatted_time,
            poll=self.poll
        )

    def test_datetime_ranges(self):
        self.assertEqual(list(self.poll.datetime_ranges), [self.range])
        self.assertEqual(self.range.poll, self.poll)

    def test_matrix_field(self):
        self.assertEqual(self.range.matrix, None)  # JSONField is nullable
        matrix = {'a': [1, 2, 3], 'b': [4, 5, 6]}
        self.range.matrix = matrix
        self.range.save()
        self.assertEqual(self.range.matrix, matrix)
