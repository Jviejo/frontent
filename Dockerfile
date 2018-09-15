FROM node:8.9.1 AS build-env
WORKDIR /app
ADD package-lock.json /app
ADD package.json /app
RUN npm i
ADD . /app
RUN npm run build

FROM pierrezemb/gostatic
COPY --from=build-env /app/dist/front-end /srv/http
WORKDIR /app
EXPOSE 80
CMD ["-port", "80", "-fallback", "./index.html"]