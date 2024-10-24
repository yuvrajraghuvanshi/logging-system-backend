docker build -t logging-system:1.0.0 .
docker run -d --name logging-system -p 4000:80 logging-system:1.0.0
