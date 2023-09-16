# Use a lightweight web server as the base image
FROM nginx:alpine

# Remove default Nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy the built web app files into the container
COPY ./dist /usr/share/nginx/html
COPY Nginx/default.conf /etc/nginx/conf.d/default.conf

# Expose the port that Nginx listens on
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
