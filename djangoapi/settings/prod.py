from .base import *

DEBUG = True

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'GlobalCodes',
        'USER': 'djangouser',
        'PASSWORD': 'refmanadmin',
        'HOST': 'localhost',
        'PORT': '3306'
    }
}

# django-pyodbc-azure settings
DATABASES = {
    'default': {
        'ENGINE': 'sql_server.pyodbc',
        'NAME': 'GlobalCodes',
        'USER': 'djangouser',
        'PASSWORD': 'refmanadmin',
        'HOST': 'localhost\\SQLEXPRESS',
        'PORT': '',

        'OPTIONS': {
            'driver': 'ODBC Driver 13 for SQL Server',
        },
    },
}