# Generated by Django 4.2.1 on 2023-05-13 20:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('polls', '0010_rename_avaliable_pollanswer_available'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pollanswer',
            name='matrix',
            field=models.JSONField(blank=True, null=True),
        ),
    ]
