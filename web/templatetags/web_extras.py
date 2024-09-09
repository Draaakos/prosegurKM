import hashlib
import random
from django import template
from django.templatetags.static import static

register = template.Library()

def create_hash_token():
    random_number = str(random.random()).encode('ascii')
    token = hashlib.md5()
    token.update(random_number)
    return token.hexdigest()

token = create_hash_token()

@register.simple_tag
def version(path):
    with open('bin/hash.txt', 'r') as f:
        static_hash = f.read()

        static_path = static(f'{static_hash}/{path}')
        return static_path
