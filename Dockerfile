FROM python:3.12-slim

WORKDIR /app

# Install dependencies separately to cache the layer
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the app
COPY . .

# Set dynamic PORT environment mapping (Default: 8000)
ENV PORT=8000
EXPOSE $PORT

# Execute Uvicorn binding to the host
CMD uvicorn api.main:app --host 0.0.0.0 --port $PORT
