FROM node:14
ARG USERNAME=wutang
ARG USER_UID=1100
ARG USER_GID=$USER_UID

# Create the user
RUN groupadd --gid $USER_GID $USERNAME \
    && useradd --uid $USER_UID --gid $USER_GID -m $USERNAME

WORKDIR /app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent
COPY . .

EXPOSE 3000
RUN chown -R $USERNAME /app
USER $USERNAME
CMD ["node", "index.js"]