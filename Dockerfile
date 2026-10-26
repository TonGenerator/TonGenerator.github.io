FROM node:24-bookworm-slim
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev --ignore-scripts && mkdir /data && chown node:node /data
COPY bin/ ./bin/
COPY cli/ ./cli/
COPY src/ ./src/
COPY desktop/client.js ./desktop/client.js
USER node
VOLUME ["/data"]
ENTRYPOINT ["node", "bin/generator-ton.mjs"]
CMD ["--output", "/data"]
