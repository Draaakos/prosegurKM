from datetime import datetime
import hashlib

def define_product_path(instance, filename):
    code = hashlib.md5()
    code.update(str(datetime.now()).encode())
    extension = filename.split('.')
    hash_code = code.hexdigest()

    return f'{hash_code}.{extension[-1]}'
