from .base import *

# SECURITY WARNING: don't run with debug turned on in production!
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