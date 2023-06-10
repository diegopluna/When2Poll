# Generated by Django 4.2.1 on 2023-06-10 20:05

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0007_friendship'),
    ]

    operations = [
        migrations.CreateModel(
            name='Blocklist',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('blocked_user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='blocked_by', to=settings.AUTH_USER_MODEL)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='blocklist', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'unique_together': {('user', 'blocked_user')},
            },
        ),
    ]
