from rest_framework import serializers
from django.contrib.auth import get_user_model
from polls.models import AvailabilityPoll, DateTimeRange, PollInvite, PollAnswer
from datetime import timedelta

User = get_user_model()

class DateTimeRangeSerializer(serializers.ModelSerializer):
    matrix = serializers.JSONField(required=False)
    class Meta:
        model = DateTimeRange
        fields = '__all__'
        extra_kwargs = {
            'poll': {'required': False}
        }

    def validate(self, data):
        start_time = data['start_time']
        end_time = data['end_time']
        if start_time.minute % 15 != 0 or end_time.minute % 15 != 0:
            raise serializers.ValidationError("Start and end times must be multiples of 15 minutes")
        if not (0 <= start_time.hour <= 23) or not (0 <= end_time.hour <= 23):
            raise serializers.ValidationError("Start and end times must have an hour value between 0 and 23")
        return data

    def create(self, validated_data):
        range = DateTimeRange.objects.create(start_time=validated_data['start_time'], end_time=validated_data['end_time'], matrix=validated_data['matrix'])
        range.save()
        return range


class PollInviteSerializer(serializers.ModelSerializer):
    class Meta:
        model = PollInvite
        fields = '__all__'
        extra_kwargs = {
            'poll': {'required': False},
            'answered': {'required': False},
            'admin': {'required': False},
            'accepted': {'required': False}
        }

    def create(self, validated_data): 
        invite = PollInvite.objects.create(receiver=validated_data['receiver'], poll=validated_data['poll'], answer=validated_data['answer'], admin=validated_data['admin'], accepted=validated_data['accepted'])
        invite.save()
        return invite

class PollAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = PollAnswer
        fields = '__all__'
        extra_kwargs = {
            'poll': {'required': False},
            'matrix': {'required': False},
            'justification': {'required': False}
        }

    def create(self, validated_data):
        self.instance = self.Meta.model(**validated_data)
        self.instance.clean()  # Call the clean method for validation
        self.instance.save()
        return self.instance


class AvailabilityPollSerializer(serializers.ModelSerializer):
    datetime_ranges = DateTimeRangeSerializer(many=True)
    #participants = serializers.SlugRelatedField(many=True, queryset = User.objects.all(), slug_field ='pk')
    #admins = serializers.SlugRelatedField(many=True, queryset = User.objects.all(), slug_field = 'pk')
    invited = PollInviteSerializer(many=True)

    class Meta:
        model = AvailabilityPoll
        fields = '__all__'

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        owner = instance.owner
        representation['owner'] = {'pk': owner.pk, 'name': owner.full_name, 'email': owner.email}
        representation['participants'] = [{'pk': user.pk, 'name': user.full_name, 'email': user.email, 'admin': user in instance.admins.all()} for user in instance.participants.exclude(pk=owner.pk)]
        representation.pop('invited')
        representation['invited_users'] = [{'pk': user.pk, 'name': user.full_name, 'email': user.email} for user in instance.pending_invite.exclude(pk=owner.pk)]
        representation['answers'] = PollAnswerSerializer(instance.answers.all(), many=True).data
        return representation
    
    def create(self, validated_data):
        datetime_ranges_data = validated_data.pop('datetime_ranges')
        invited_data = validated_data.pop('invited')
        #admins_data = validated_data.pop('admins')
        poll = AvailabilityPoll.objects.create(**validated_data)
        invited_data.append({'receiver': poll.owner, 'poll': poll, 'answered': True, 'admin': True, 'accepted': True}) #owner automatically invites themselves as admin and accepts

        for range_data in datetime_ranges_data:
            range_data['poll'] = poll
            
            cursor = range_data['start_time']
            end_time = range_data['end_time']
            matrix = []
            while cursor < end_time:
                #matrix.append({"start_time": cursor.isoformat(), "availability": 0})
                matrix.append("0")
                cursor += timedelta(minutes=15)
            range_data['matrix'] = ''.join(matrix)

            DateTimeRange.objects.create(**range_data)

        for invite in invited_data:
            invite['poll'] = poll
            if 'answered' not in invite:
                invite['answered'] = False
            if 'accepted' not in invite:
                invite['accepted'] = False
            if 'admin' not in invite:
                invite['admin'] = False
            PollInvite.objects.create(**invite)

        # for admin in admins_data:
        #     poll.admins.add(admin)

        # for participant in participants_data:
        #     poll.participants.add(participant)

        return poll
    



# class PollAdminInviteSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = PollAdminInvite
#         fields = '__all__'

    # name = serializers.CharField(max_length=255)
    # description = serializers.TextField(blank=True)
    # duration = serializers.DurationField()
    # datetime_ranges = serializers.ManyToManyField(Ranges, related_name='datetime_ranges')
    # deadline = serializers.DateTimeField()
    # participants = serializers.ManyToManyField(User, related_name='availability_polls')