FROM node:18-alpine
 
WORKDIR /usr/app

COPY ./ /usr/app

RUN npm install
  
RUN npm run build
 
USER node

EXPOSE 3000
 
CMD ["node", "dist/main.js"]

# ARG IMAGE=node:16.13-alpine

# FROM $IMAGE as builder

# WORKDIR /app

# COPY . .

# RUN npm install

# #DEV

# FROM builder as DEV

# CMD [""]

# #PROD MIDDLE
# FROM builder as prod-build

# RUN npm run build

# RUN npm prune --production

# #PROD
# FROM $IMAGE as prod

# COPY --chown=node:node --from=prod-build /app/dist /app/dist

# COPY --chown=node:node --from=prod-build /app/node_modules /app/node_modules

# COPY --chown=node:node --from=prod-build /app/.env /app/.env

# ENV NODE_ENV=production

# ENTRYPOINT ["node", "dist/main.js"]

# WORKDIR ./app/dist

# CMD [""]

# USER node