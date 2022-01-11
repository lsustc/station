FROM hub-dev.hexin.cn/b2cweb/node:v8.9

WORKDIR /var/www/station
COPY package.json /tmp/package.json
RUN npm config set registry 'http://repositories.myhexin.com:8081/repository/npm-public/' && cd /tmp && npm install --production
RUN cp -a /tmp/node_modules /var/www/station
# COPY /tmp/node_modules /var/www/station/node_modules


COPY ./ /var/www/station

ENV ENABLE_MONGODB false
ENV ENABLE_REDIS=true \
    ENABLE_MEMCACHED=false \
    CODEPATH='/var/www/station/'

EXPOSE 80
