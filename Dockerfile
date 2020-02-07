FROM node:13
COPY . /app
WORKDIR /app
RUN npm install
RUN npm run dev
EXPOSE 3000
CMD [ "npm", "run"]


# FROM image name                                   -using based image to start build process
# RUN command                                       -to execute command and build image
# CMD application "argument", "argument"            -to execute command after building image 
# ENTRYPOINT application "argument", "argument"     -ovewrite CMD command, run first after runnning container
# ADD /source directory /destination directory      -coping files inside container
# ENV key value                                     -set enviroment variable
# WORKDIR /path                                     -where to execute comand
# EXPOSE port                                       -set port number inside container
# MAINTAINER name                                   -set author name
# USER UID                                          -set user id , that will execute docker container
# VOLUME /my_files                                  -set path where all file will be located into cintainer