# 1. Use the official Node.js image as the base
# Replace "22" with your preferred Node.js version
FROM node:22

# 2. Set the working directory in the container
WORKDIR /app

# 3. Copy the package.json and package-lock.json to the working directory
COPY package*.json ./

# 4. Install dependencies
RUN npm install

# 5. Copy the rest of the application files
COPY . .

# 6. Expose the port the app runs on (optional, typically 3000 for React/Node apps)
EXPOSE 3000

# 7. Specify the command to run the application
# Replace `npm start` with the command you use to start your app
CMD ["npm", "start"]