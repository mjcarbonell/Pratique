# Stage 1: Install dependencies and build the application
FROM node:16-alpine as build

# Set the working directory
WORKDIR /app

#CLEARING CACHE
ARG CACHEBUST=1

# Copy the package.json and yarn.lock files
COPY package.json yarn.lock ./

# Install all dependencies including devDependencies
RUN yarn install

# Copy the rest of the application files
COPY . .

# Ensure the Vite executable has the right permissions
RUN chmod +x node_modules/.bin/vite

# Build the application
RUN yarn build

# Stage 2: Create the production image
FROM node:16-alpine as production

# Set the working directory
WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./package.json
# COPY --from=build /app/server.js ./server.js
COPY --from=build /app/yarn.lock ./yarn.lock

# Install only the production dependencies
RUN yarn global add serve

RUN yarn install --production

EXPOSE 3000

# Set the command to run the application
CMD ["serve", "-s", "dist"]

# old attempt
# CMD ["sh", "-c", "node server.js & serve -s dist"]
