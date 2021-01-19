from django.db import models
from django.contrib import admin

class Channel(models.Model):
    id = models.AutoField(
        db_column='chaId',
        primary_key=True,
    )
    name = models.CharField(
        db_column='chaName', 
        max_length=45,
    )
    status = models.CharField(
        db_column='chaStatus', 
        max_length=45,
        choices=[(x,x) for x in ('Active', 'Inactive')],
        default='Active'
    )
    users = models.FloatField(
        db_column='chaUsers', 
        blank=False,
        null=False,
        default=0
    )
    parent = models.IntegerField(
        db_column='chaParent',
        blank=False,
        null=False,
        default=0
    )
    percent = models.FloatField(
        db_column='chaPercent',
        blank=False,
        null=False,
        default=0
    )

    def __str__(self):
        return f"{self.id}({self.parent}) - {self.name} - {self.users} - {self.status} - {self.percent}"

    class Meta:
        managed = True
        db_table = 'Channel'
        unique_together = (('name', 'parent'),)

        
admin.site.register(Channel)