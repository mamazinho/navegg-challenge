# Generated by Django 3.1.5 on 2021-01-18 15:02

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Channel',
            fields=[
                ('id', models.IntegerField(db_column='chaId', primary_key=True, serialize=False, unique=True)),
                ('name', models.CharField(db_column='chaName', max_length=45)),
                ('status', models.CharField(choices=[('Active', 'Active'), ('Inactive', 'Inactive')], db_column='chaStatus', default='Active', max_length=45)),
                ('users', models.FloatField(db_column='chaUsers', default=0)),
                ('parent', models.IntegerField(db_column='chaParent', default=0)),
                ('percent', models.FloatField(db_column='chaPercent', default=0)),
            ],
            options={
                'db_table': 'Channel',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='Site',
            fields=[
                ('id', models.AutoField(db_column='sitId', primary_key=True, serialize=False)),
                ('name', models.CharField(db_column='sitName', max_length=45)),
                ('status', models.CharField(choices=[('active', 'active'), ('inactive', 'inactive')], db_column='sitStatus', default='active', max_length=45)),
                ('urls', models.CharField(db_column='sitUrls', max_length=556)),
                ('categories', models.CharField(db_column='sitCategories', max_length=556)),
            ],
            options={
                'db_table': 'Site',
                'managed': True,
            },
        ),
    ]
