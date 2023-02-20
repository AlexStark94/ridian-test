FROM python:3.10.9

# Allow statements and log messages to immediately appear in the Knative logs
ENV PYTHONUNBUFFERED True

# Install Python dependencies
COPY ./requirements.txt ./requirements.txt
RUN pip install -r ./requirements.txt

# Copy local code to the container image.
COPY . ./

ENV PORT 8080

# Run the web service on container startup. Here we use the gunicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]



