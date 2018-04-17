FROM node:8-alpine

RUN apk update \
 && apk add jq \
 && rm -rf /var/cache/apk/*


COPY *.js package.json package-lock.json /src/
WORKDIR /src
RUN mkdir -p "/data/"
RUN npm install
RUN npm install --global
RUN mkdir -p "/opt/resource" \
&& ln -sf "/usr/local/bin/concourse-pact-broker-resource-check" "/opt/resource/check" \
&& ln -sf "/usr/local/bin/concourse-pact-broker-resource-in" "/opt/resource/in" \
&& ln -sf "/usr/local/bin/concourse-pact-broker-resource-out" "/opt/resource/out" \
&& npm cache clean --force
