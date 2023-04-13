from rest_framework import serializers
from django.contrib.auth import get_user_model
from polls.models import AvailabilityPoll, DateTimeRange

User = get_user_model()


class ParticipantsSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['full_name']

class DateTimeRangeSerializer(serializers.ModelSerializer):
    class Meta:
        model = DateTimeRange
        fields = '__all__'
    
    def create(self, validated_data):
        range = DateTimeRange.objects.create(start_time=validated_data['start_time'], end_time=validated_data['end_time'])
        range.save()
        return range

class AvailabilityPollSerializer(serializers.ModelSerializer):
    datetime_ranges = DateTimeRangeSerializer(many=True)
    participants = ParticipantsSerializer(many=True)

    class Meta:
        model = AvailabilityPoll
        fields = '__all__'

    def create(self, validated_data):
        datetime_ranges_data = validated_data.pop('datetime_ranges')
        participants_data = validated_data.pop('participants')
        poll = AvailabilityPoll.objects.create(**validated_data)

        for range in datetime_ranges_data:
            poll.datetime_ranges.add(DateTimeRangeSerializer.create(self, validated_data=range))

        for participant in participants_data:
            user = User.objects.get(email=participant['email'])
            poll.users.add(user)

        return poll

    # name = serializers.CharField(max_length=255)
    # description = serializers.TextField(blank=True)
    # duration = serializers.DurationField()
    # datetime_ranges = serializers.ManyToManyField(Ranges, related_name='datetime_ranges')
    # deadline = serializers.DateTimeField()
    # participants = serializers.ManyToManyField(User, related_name='availability_polls')