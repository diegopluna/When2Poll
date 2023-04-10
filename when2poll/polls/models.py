from django.db import models
from django.contrib.auth import get_user_model
# import json
# from django.core.serializers.json import DjangoJSONEncoder
from django.utils import timezone

# Create your models here.

User = get_user_model()

class DateTimeRange(models.Model):
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()

    # def get_ranges_in_utc(self):
    #     ranges_in_utc = []
    #     for start, end in self.ranges:
    #         start_datetime = timezone.make_aware(start, timezone=self.timezone)
    #         end_datetime = timezone.make_aware(end, timezone=self.timezone)
    #         start_utc = start_datetime.astimezone(timezone.utc)
    #         end_utc = end_datetime.astimezone(timezone.utc)
    #         ranges_in_utc.append((start_utc, end_utc))
    #     return ranges_in_utc

class AvailabilityPoll(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    duration = models.TimeField()
    datetime_ranges = models.ManyToManyField(DateTimeRange, related_name='datetime_ranges')
    deadline = models.DateTimeField()
    participants = models.ManyToManyField(User, related_name='participants')

    def is_expired(self):
        return self.deadline <= timezone.now()

    def get_participant_count(self):
        return self.participants.count()
    
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
