# first step (to install all the dependencies)

npm install

# Run the application

npm run dev

# Build Docker image using

docker build -t logging-system:1.0.0 .

# Run the Image using

docker run -d --name logging-system -p 4000:4000 logging-system:1.0.0
