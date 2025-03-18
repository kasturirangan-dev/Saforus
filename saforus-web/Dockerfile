# Stage 1: Build the application
FROM node:18 as build

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

# Copy the patch file before running pnpm install
COPY patches patches

RUN npx pnpm install

COPY . .

ARG WEB_ENV
ARG APP_NAME=saforus-webapp

# Install necessary dependencies for Puppeteer and Chrome
RUN apt-get update && apt-get install -y \
    wget \
    gnupg \
    ca-certificates \
    fonts-liberation \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libatspi2.0-0 \
    libcairo2 \
    libcups2 \
    libdbus-1-3 \
    libdrm2 \
    libexpat1 \
    libgbm1 \
    libglib2.0-0 \
    libgtk-3-0 \
    libnspr4 \
    libnss3 \
    libpango-1.0-0 \
    libx11-6 \
    libx11-xcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxext6 \
    libxfixes3 \
    libxkbcommon0 \
    libxrandr2 \
    libxss1 \
    libxtst6 \
    libvulkan1 \
    --no-install-recommends

# Download and install the latest Google Chrome package directly
RUN wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb \
    && dpkg -i google-chrome-stable_current_amd64.deb || apt-get -fy install \
    && rm google-chrome-stable_current_amd64.deb

# Ensure that Chrome and its dependencies are correctly installed
RUN apt-get -f install

# Set environment variable to indicate Docker environment
ENV DOCKER_ENV=true

# Set environment variable for Puppeteer to use the installed Chrome
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/opt/google/chrome/google-chrome

# Enhanced logging to verify the build command
RUN echo "Building application with APP_NAME=$APP_NAME and WEB_ENV=$WEB_ENV"
RUN npx pnpm run build -- $APP_NAME --mode $WEB_ENV

# Generate the nx graph using npx
RUN npx nx dep-graph --file=graph-output.html

# Stage 2: Create the final Docker image with the built application
FROM nginx:stable

ARG APP_NAME=saforus-webapp
ARG PORT
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/apps/$APP_NAME /usr/share/nginx/html
COPY --from=build /app/graph-output.html /usr/share/nginx/html/libs-graph/index.html
COPY --from=build /app/static /usr/share/nginx/html/libs-graph/static

EXPOSE $PORT

CMD ["nginx", "-g", "daemon off;"]
