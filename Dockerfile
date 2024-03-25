FROM oven/bun:1
VOLUME [ "/app" ]

WORKDIR /app

COPY package*.json ./
COPY bun.* ./

RUN bun install

COPY . .

CMD [ "bun", "start" ]
