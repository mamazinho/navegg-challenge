from challenge.models import Channel
from django.core.management.base import BaseCommand
import datetime, json, requests

'''
    This command get the json from github or from local folder 'utils', read it
    and save the data in channel table
'''

class Command(BaseCommand):

    def handle(self, *args, **options):
        # Request to Github (this is unstable)
        print("Getting the JSON file...\n")
        req = requests.get('https://raw.githubusercontent.com/Navegg/navegg-frontend-challenge/master/channels.json')
        response = req.json()
        to_create = []

        # To solve the unstable of github
        if req.status_code != 200:
            json_file = open('challenge/utils/initial_channels.json')
            response = json.load(json_file)

        # Reading each line from JSON
        print("Reading the JSON file...\n")
        for channel in response:

            cha = Channel(
                id=channel['id'],
                name=channel['name'],
                status=channel['status'],
                users=channel['users'],
                parent=channel['parent'],
                percent=channel['percent'],
            )
            to_create.append(cha)

        # Save in database
        Channel.objects.bulk_create(to_create, ignore_conflicts=True)
        
        print("Process completed successfully")