# Generated by Django 4.2.1 on 2023-05-13 17:15

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('polls', '0008_remove_availabilitypoll_admins_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='pollanswer',
            name='justification',
            field=models.TextField(blank=True, max_length=1000),
        ),
        migrations.AddField(
            model_name='pollanswer',
            name='poll',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='polls.availabilitypoll'),
            preserve_default=False,
        ),
        migrations.DeleteModel(
            name='Justification',
        ),
    ]
