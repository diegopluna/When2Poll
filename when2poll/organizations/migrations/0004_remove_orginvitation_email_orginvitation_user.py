# Generated by Django 4.1.7 on 2023-04-17 02:46

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('organizations', '0003_rename_group_orginvitation_organization_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='orginvitation',
            name='email',
        ),
        migrations.AddField(
            model_name='orginvitation',
            name='user',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]