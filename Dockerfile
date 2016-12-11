FROM mhart/alpine-node:6
ADD . .
RUN npm install
CMD ["node", "app.js"]
