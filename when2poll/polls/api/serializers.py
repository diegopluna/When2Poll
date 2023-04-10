from rest_framework import serializers
from django.contrib.auth import get_user_model
from polls.models import AvailabilityPoll, DateTimeRange
from accounts.api.serializers import UserSerializer

User = get_user_model()

class DateTimeRangeSerializer(serializers.ModelSerializer):
    class Meta:
        model = DateTimeRange
        fields = '__all__'

class AvailabilityPollSerializer(serializers.ModelSerializer):
    datetime_ranges = DateTimeRangeSerializer(many=True)
    participants = UserSerializer(many=True)

    class Meta:
        model = AvailabilityPoll
        fields = '__all__'



    # name = serializers.CharField(max_length=255)
    # description = serializers.TextField(blank=True)
    # duration = serializers.DurationField()
    # datetime_ranges = serializers.ManyToManyField(Ranges, related_name='datetime_ranges')
    # deadline = serializers.DateTimeField()
    # participants = serializers.ManyToManyField(User, related_name='availability_polls')