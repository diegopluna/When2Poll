from rest_framework import serializers
from django.contrib.auth import get_user_model
from polls.models import AvailabilityPoll, DateTimeRange, PollInvite, PollAnswer, Justification
from datetime import timedelta

User = get_user_model()

class DateTimeRangeSerializer(serializers.ModelSerializer):
    matrix = serializers.JSONField(required=False)
    class Meta:
        model = DateTimeRange
        fields = ('start_time', 'end_time', 'matrix')

    def create(self, validated_data): 
        range = DateTimeRange.objects.create(start_time=validated_data['start_time'], end_time=validated_data['end_time'], matrix=validated_data['matrix'])
        range.save()
        return range

class AvailabilityPollSerializer(serializers.ModelSerializer):
    datetime_ranges = DateTimeRangeSerializer(many=True)
    participants = serializers.SlugRelatedField(many=True, queryset = User.objects.all(), slug_field ='pk')
    admins = serializers.SlugRelatedField(many=True, queryset= User.objects.all(), slug_field = 'pk')

    class Meta:
        model = AvailabilityPoll
        fields = '__all__'

    def create(self, validated_data):
        datetime_ranges_data = validated_data.pop('datetime_ranges')
        participants_data = validated_data.pop('participants')
        admins_data = validated_data.pop('admins')
        poll = AvailabilityPoll.objects.create(**validated_data)

        for range_data in datetime_ranges_data:
            range_data['poll'] = poll
            
            cursor = range_data['start_time']
            end_time = range_data['end_time']
            matrix = []
            while cursor < end_time:
                matrix.append({"start_time": cursor.isoformat(), "availability": 0})
                cursor += timedelta(minutes=15)
            range_data['matrix'] = matrix

            DateTimeRange.objects.create(**range_data)

        for admin in admins_data:
            poll.admins.add(admin)

        for participant in participants_data:
            poll.participants.add(participant)

        return poll
    

class PollInviteSerializer(serializers.ModelSerializer):
    class Meta:
        model = PollInvite
        fields = '__all__'

# class PollAdminInviteSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = PollAdminInvite
#         fields = '__all__'

class PollAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = PollAnswer
        fields = ('user', 'matrix', 'available')

class JustificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Justification
        fields = ('justification', 'user', 'poll')


    # name = serializers.CharField(max_length=255)
    # description = serializers.TextField(blank=True)
    # duration = serializers.DurationField()
    # datetime_ranges = serializers.ManyToManyField(Ranges, related_name='datetime_ranges')
    # deadline = serializers.DateTimeField()
    # participants = serializers.ManyToManyField(User, related_name='availability_polls')