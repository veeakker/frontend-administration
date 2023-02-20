FROM madnificent/ember:4.9.2 as builder

LABEL maintainer="info@redpencil.io"

WORKDIR /app
COPY package.json .
RUN npm install --legacy-peer-deps
COPY . .
RUN npx browserslist@latest --update-db
RUN ember build -dev

FROM semtech/ember-proxy-service:1.4.0

COPY --from=builder /app/dist /app