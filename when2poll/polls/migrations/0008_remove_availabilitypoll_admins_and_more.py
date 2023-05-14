# Generated by Django 4.2.1 on 2023-05-13 15:08

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('polls', '0007_remove_availabilitypoll_datetime_ranges_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='availabilitypoll',
            name='admins',
        ),
        migrations.RemoveField(
            model_name='availabilitypoll',
            name='participants',
        ),
        migrations.AlterField(
            model_name='availabilitypoll',
            name='owner',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.CreateModel(
            name='PollInvite',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('answered', models.BooleanField(default=False)),
                ('accepted', models.BooleanField(default=False)),
                ('admin', models.BooleanField(default=False)),
                ('poll', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='polls.availabilitypoll')),
                ('receiver', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='PollAnswer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('matrix', models.JSONField(blank=True)),
                ('avaliable', models.BooleanField(default=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Justification',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('justification', models.TextField(max_length=1000)),
                ('poll', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='polls.availabilitypoll')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]