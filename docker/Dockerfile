# The image from Docker Hub
FROM node:10.16-alpine

# Install global dependencies
RUN apk add --no-cache git openssh tzdata curl

# We must set up default timezone
# https://wiki.alpinelinux.org/wiki/Setting_the_timezone
RUN cp /usr/share/zoneinfo/Europe/Moscow /etc/localtime \
    && echo "Europe/Moscow" > /etc/timezone

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json & package-lock.json fiels
COPY ["package*.json", "./"]

RUN npm install

# Bundle app sources
COPY ["src", "./src"]

# Make port 8080 available to the world outside this container
EXPOSE 8080

# At the end, set the user to use when running this image
USER node

CMD ["node", "src/index.js"]
