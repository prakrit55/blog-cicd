FROM node:20 as builder

WORKDIR /build

COPY package.json package-lock.json ./
RUN npm install

COPY src/ src/

COPY tsconfig.json tsconfig.json

RUN npm run build 



FROM node:20 as runner

WORKDIR /app

COPY --from=builder /build/node_modules/ /app/node_modules/
COPY --from=builder /build/package.json /app
COPY --from=builder /build/dist /app/dist

EXPOSE 5000

CMD ["npm", "start"]