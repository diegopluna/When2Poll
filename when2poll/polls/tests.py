from django.test import TestCase

# Create your tests here.
from polls.models import AvailabilityPoll, DateTimeRange, User
from polls.api.serializers import AvailabilityPollSerializer

class AvailabilityPollSerializerTestCase(TestCase):
    def setUp(self):
        # Create some test data
        self.user1 = User.objects.create(email='user1@example.com', full_name='User 1')
        self.user2 = User.objects.create(email='user2@example.com', full_name='User 2')
        self.range1 = DateTimeRange.objects.create(start_time='2022-01-01 00:00:00', end_time='2022-01-01 01:00:00')
        self.range2 = DateTimeRange.objects.create(start_time='2022-01-02 00:00:00', end_time='2022-01-02 01:00:00')
        self.poll = AvailabilityPoll.objects.create(name='Test Poll', description='A test poll', duration='1:00:00', deadline='2022-01-01 00:00:00')
        self.poll.participants.add(self.user1, self.user2)
        self.poll.datetime_ranges.add(self.range1, self.range2)

        self.serializer_data = {
            'id': 1,
            'datetime_ranges': [
                {
                    'id': 1,
                    'start_time': '2022-01-01 00:00:00',
                    'end_time': '2022-01-01 01:00:00'
                },
                {
                    'id': 2,
                    'start_time': '2022-01-02 00:00:00',
                    'end_time': '2022-01-02 01:00:00'
                }
            ],
            'participants': [
                {
                    'email': 'user1@example.com',
                    'full_name': 'User 1'
                },
                {
                    'email': 'user2@example.com',
                    'full_name': 'User 2'
                }
            ],
            'name': 'Test Poll',
            'description': 'A test poll',
            'duration': '1:00:00',
            'deadline': '2022-01-01 00:00:00',
            
        }

    def test_availability_poll_serializer(self):
        serializer = AvailabilityPollSerializer(instance=self.poll)
        self.assertEqual(serializer.data, self.serializer_data)