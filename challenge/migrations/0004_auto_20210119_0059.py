# Generated by Django 3.1.5 on 2021-01-19 00:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('challenge', '0003_auto_20210119_0024'),
    ]

    operations = [
        migrations.AlterField(
            model_name='channel',
            name='id',
            field=models.AutoField(db_column='chaId', primary_key=True, serialize=False),
        ),
    ]