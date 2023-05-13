from django.db import models
from django.conf import settings
from django.contrib.auth import get_user_model
# import json
# from django.core.serializers.json import DjangoJSONEncoder
from django.utils import timezone

# Create your models here.

User = get_user_model()
#User = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

class AvailabilityPoll(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    duration = models.TimeField()
    #datetime_ranges = models.ManyToManyField(DateTimeRange, related_name='datetime_ranges')
    deadline = models.DateTimeField()
    owner = models.ForeignKey(User, on_delete=models.CASCADE) #review the on_delete behaviour
    # admins = models.ManyToManyField(User, related_name='admins')
    # participants = models.ManyToManyField(User, related_name='participants')
    defined = models.BooleanField(default=False)

    @property
    def datetime_ranges(self):
        return self.datetimerange_set.all()
    
    @property
    def invited(self):
        return self.pollinvite_set.all()

    @property
    def participants(self):
        return self.pollinvite_set.filter(accepted=True) #query for accepted invites
    
    @property
    def answered_users(self):
        return self.pollanswer_set.values_list('user', flat=True)

    @property
    def pending_answer(self):
        return self.participants.exclude(self.answered_users)
    
    @property
    def answers(self):
        return self.pollanswer_set.all()
    
    @property
    def admins(self):
        return self.pollinvite_set.filter(accepted=True, admin=True)

    def is_expired(self):
        return self.deadline <= timezone.now()
    
    # def invited_admin(self, participants):
    #     #invite a participant to become an admin
    #     if self.owner == participants or participants in self.admins.all():
    #         #user is already an admin or the owner of the poll
    #         return
    #     self.admins.add(participants)
    #    # add participants to admins field

class DateTimeRange(models.Model):
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    poll = models.ForeignKey(AvailabilityPoll, on_delete=models.CASCADE)
    matrix = models.JSONField()

class PollInvite(models.Model):
    #sender = models.ForeignKey(User, on_delete=models.CASCADE)
    receiver = models.ForeignKey(User, on_delete=models.CASCADE)
    poll = models.ForeignKey(AvailabilityPoll, on_delete=models.CASCADE)
    answered = models.BooleanField(default=False)
    admin = models.BooleanField(default=False)
    accepted = models.BooleanField(default=False)

# class PollAdminInvite(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE)
#     poll = models.ForeignKey(AvailabilityPoll, on_delete=models.CASCADE)
#     answered = models.BooleanField(default=False)
#     accepted = models.BooleanField(default=False)

class PollAnswer(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    poll = models.ForeignKey(AvailabilityPoll, on_delete=models.CASCADE)
    avaliable = models.BooleanField(default=True)
    matrix = models.JSONField(blank=True)
    justification = models.TextField(max_length=1000, blank=True)
    
    # def serialize(self):
    #     data = {
    #         'name': self.name,
    #         'description': self.description,
    #         'duration': self.duration.total_seconds(),
    #         'datetime_ranges': [
    #             {
    #                 'start_time': range.start_time.isoformat(),
    #                 'end_time': range.end_time.isoformat()
    #             }
    #             for range in self.datetime_ranges.all()
    #         ],
    #         'deadline': self.deadline.isoformat(),
    #         'participants': [participant.username for participant in self.participants.all()]
    #     }
    #     return json.dumps(data, cls=DjangoJSONEncoder)


    # def deserialize(data):
    #     ranges_data = data.pop('datetime_ranges', [])
    #     participants_data = data.pop('participants', [])

    #     instance = AvailabilityPoll(**data)
    #     instance.save()

    #     for range_data in ranges_data:
    #         instance.datetime_ranges.create(**range_data)

    #     for participant_username in participants_data:
    #         participant = User.objects.get(username=participant_username)
    #         instance.participants.add(participant)

    #     return instance


    #poll = models.ForeignKey(AvailabilityPoll, on_delete=models.CASCADE)
    #user = models.ForeignKey(User, on_delete=models.CASCADE)

    # def get_ranges_in_utc(self):
    #     ranges_in_utc = []
    #     for start, end in self.ranges:
    #         start_datetime = timezone.make_aware(start, timezone=self.timezone)
    #         end_datetime = timezone.make_aware(end, timezone=self.timezone)
    #         start_utc = start_datetime.astimezone(timezone.utc)
    #         end_utc = end_datetime.astimezone(timezone.utc)
    #         ranges_in_utc.append((start_utc, end_utc))
    #     return ranges_in_utc

