#!/bin/bash

python manage.py makemigrations && \
python manage.py migrate && \
python manage.py collectstatic --noinput && \
bash ./bin/server-start.sh
