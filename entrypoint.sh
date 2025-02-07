#!/bin/bash

# Crear la base de datos si no existe
echo "Verificando si la base de datos 'kilome' existe..."
if ! psql -h $POSTGRES_HOST -U $POSTGRES_USER -d postgres -c "SELECT 1 FROM pg_database WHERE datname='kilome';" | grep -q 1; then
  echo "La base de datos 'kilome' no existe. Creando la base de datos..."
  python manage.py migrate --run-syncdb
else
  echo "La base de datos 'kilome' ya existe."
fi

# Aplicar migraciones
echo "Aplicando migraciones..."
python manage.py makemigrations
python manage.py migrate
python manage.py loaddata 001.json
python manage.py runscript xml
python manage.py runscript generate_month_template

# Ejecutar el script de inicio
exec bin/startup.sh
