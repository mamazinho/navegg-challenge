from challenge.models import Site
from django.core.management.base import BaseCommand
import datetime, json, requests, csv

'''
    This command get the csv from local folder 'utils', read it
    and save the data in channel table
'''
 
class Command(BaseCommand):

    def handle(self, *args, **options):

        # Get local csv
        csv_file = open('challenge/utils/initial_sites.csv')
        to_create = []
        reader = csv.DictReader(csv_file, delimiter=',')

        # Reading each csv line
        print("Reading CSV file...\n")
        for line in reader:

            site = Site(
                name=line['name'],
                status=line['status'],
                urls=line['urls'],
                categories=line['categories'],
            )
            to_create.append(site)

        # Save in database
        Site.objects.bulk_create(to_create, ignore_conflicts=True)

        print("Process completed successfully")