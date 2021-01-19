from django.db import models
from django.contrib import admin

class Site(models.Model):
    id = models.AutoField(
        db_column='sitId',
        primary_key=True,
    )
    name = models.CharField(
        db_column='sitName', 
        max_length=45,
        unique=True
    )
    status = models.CharField(
        db_column='sitStatus', 
        max_length=45,
        choices=[(x,x) for x in ('active', 'inactive')],
        default='active'
    )
    urls = models.CharField(
        db_column='sitUrls',
        max_length=556,
    )
    categories = models.CharField(
        db_column='sitCategories',
        max_length=556,
    )

    def __str__(self):
        return f"{self.id} - {self.name} - {self.urls} - {self.status} - {self.categories}"

    class Meta:
        managed = True
        db_table = 'Site'

        
admin.site.register(Site)