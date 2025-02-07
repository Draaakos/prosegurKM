# Start of Selection
FROM node:22-alpine AS builder
WORKDIR /src/code
COPY . /src/code
RUN apk add --no-cache make
ENV NODE_ENV=production
RUN npm ci --production && make build-front

FROM python:3.10-slim
ENV PYTHONUNBUFFERED 1
WORKDIR /app
COPY . /app
RUN mkdir -p static
RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 8000

# ENTRYPOINT [ "sh", "bin/startup.sh" ]


COPY entrypoint.sh /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
# CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
