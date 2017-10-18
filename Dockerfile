FROM node:8.7.0 AS builder
COPY *.js package.json package-lock.json /src/
WORKDIR /src
RUN mkdir -p "/data/"
RUN npm install
RUN npm pack
RUN mv "/src/cathive-concourse-pact-broker-resource-"*".tgz" "/data/cathive-concourse-pact-broker-resource.tgz"

FROM node:8.7.0
LABEL maintainer="headcr4sh@gmail.com" \
      version="1.0.0"
COPY --from=builder "/data/cathive-concourse-pact-broker-resource.tgz" "/tmp/"
RUN npm install --global "/tmp/cathive-concourse-pact-broker-resource.tgz" \
&& mkdir -p "/opt/resource" \
&& ln -sf "/usr/local/bin/concourse-pact-broker-resource-check" "/opt/resource/check" \
&& ln -sf "/usr/local/bin/concourse-pact-broker-resource-in" "/opt/resource/in" \
&& ln -sf "/usr/local/bin/concourse-pact-broker-resource-out" "/opt/resource/out" \
&& rm -f "/tmp//cathive-concourse-pact-broker-resource.tgz" \
&& npm cache clean --force
