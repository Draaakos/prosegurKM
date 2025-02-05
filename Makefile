.PHONY: all run clean

all: run

run:
	@echo "Starting the Django development server..."
	@. env/bin/activate && python manage.py runserver

month:
	@echo "Running the script to generate month template..."
	@. env/bin/activate && python manage.py runscript generate_month_template

clean:
	rm -rf node_modules
	rm -rf static/js/*.bundle.js
