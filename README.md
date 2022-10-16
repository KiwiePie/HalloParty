# Get started

- Install the dependencies: Use the command `npm install` or `yarn`

# Adding commands

- Create command files inside the [`src/commands`](src/commands) directory. Check the example command [`ping.js`](src/commands/ping.js) for reference

- **Then, edit the [`commands/index.js`](src/commands/index.js) file to re export everything from your created files**. Use the syntax `export * from './<filename>.js'` for each file. Replace `<filename>` with the name of the files you created.
- In the managing step, when you proceed to add commands, only commands that are exported from this [`commands/index.js`](src/commands/index.js) file will be showed.

# Add environemnt variables for development

- Create a file named `.env` in the root of the project.
- put these variables in that file

```
TOKEN=<bot token>
CLIENT_ID=<application or bot client id>
GUILD_ID=<a guild or server id>
DB_URL=<database url>
```

The GUILD_ID variable is optional. If set, it will be used by default in the managing step.

# Manage commands

```sh
npm run manage

# or

yarn manage
```

# Start the bot in development mode

```sh
npm run dev

# or

yarn dev
```
