#!/bin/bash

gunicorn -c bin/gunicorn.config.py kilome.wsgi:application
