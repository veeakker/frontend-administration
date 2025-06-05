FROM madnificent/ember:5.12.0 as builder

LABEL maintainer="info@redpencil.io"

WORKDIR /app
COPY package.json .
COPY .npmrc-build /root/.npmrc
RUN npm install --legacy-peer-deps
COPY . .
RUN npx browserslist@latest --update-db
RUN ember build -dev

FROM semtech/static-file-service:0.2.0

COPY --from=builder /app/dist /data
