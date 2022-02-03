FROM node:16.12.0-buster as build
ARG REACT_APP_API_HOST
ARG REACT_APP_L1_CHAIN_ID
ARG REACT_APP_L2_CHAIN_ID
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY public/ ./public/
COPY src/ ./src/
COPY package.json yarn.lock ./
RUN yarn
RUN yarn build

FROM nginx:latest
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
