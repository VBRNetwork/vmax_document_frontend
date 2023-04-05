# pull official base image

FROM node:16-bullseye

RUN apt install \
    autoconf \
    automake \
    bash \
    g++ \
    libpng-dev \
    make

# set working directory

COPY ./hp_sales_frontend /app

WORKDIR /app

RUN npm install

# RUN npm install react-scripts@3.4.1 -g

# add app

# start app

CMD ["npm", "start"]
