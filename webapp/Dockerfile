# # Create image based on the official Node 6 image from dockerhub
# FROM node:14.15.4

# # Create a directory where our app will be placed
# RUN mkdir -p /usr/src/app

# # Change directory so that our commands run inside this new directory
# WORKDIR /usr/src/app

# # Copy dependency definitions
# COPY package.json /usr/src/app

# # Install dependecies
# RUN npm install

# # Get all the code needed to run the app
# COPY . /usr/src/app

# # Expose the port the app runs in
# EXPOSE 4200
# # Serve the app
# ng serve --host 0.0.0.0


# base image
FROM node:12.2.0



# set working directory
WORKDIR /app

#add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies

COPY package.json /app/package.json
RUN npm install
#RUN npm install -g @angular/cli@7.3.9

# add app
COPY . /app

# start app
CMD ng serve --host 0.0.0.0
