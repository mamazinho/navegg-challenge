## Install virtualenvwrapper:
    $ sudo apt-get install python-pip
    $ pip install --upgrade virtualenv
    $ sudo apt-get install python3 python3-pip virtualenvwrapper libmysqlclient-dev libsnappy-dev gcc libssl-dev
    $ source /etc/bash_completion.d/virtualenvwrapper
    $ mkvirtualenv -p /usr/bin/python3 nvgc

## How to DB:
    $ sudo mysql -e "CREATE DATABASE navegg"
    $ sudo mysql -e "CREATE USER navegg IDENTIFIED BY 'n4v3gg'"
    $ sudo mysql -e "GRANT ALL ON navegg.* TO 'navegg'@'%' IDENTIFIED BY 'n4v3gg'"

## How to Setup:
    $ workon nvgc
    $ pip install -r requirements.txt
    $ python manage.py migrate	

## How to Run:
    $ python manage.py runserver