// This bot cannot upload lettered files, only numerical ones.

// "clientId": "your-application-id-goes-here",
// "guildId": "1046800595983552652"

const {Client, GatewayIntentBits, ActivityFlagsBitField} = require('discord.js');
const {token} = require('./config.json');
const fs = require('fs'); // Interact with file systems
const path = require('path'); // Construct file paths
const { addAbortSignal } = require('stream');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ]
});

// const prefix = '-';

client.once('ready', () => {
  console.log('The bot is online!');
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', message => {
  if (message.content === '!upload') {
    // Trigger function to upload files
    const folderPath = '/Users/kylerli/Image_Tests';

    // Send it to the channel
    fs.readdir(folderPath, async (err, files) => {
      if (err) {
        console.error('Error reading folder:', err);
        message.channel.send('Error reading the folder.')
        return;
      }

      // Filter and sort files numerically
      const sortedFiles = files
        // .filter(file => !isNaN(parseInt(file)))  // Filter out any non-numbered files
        .sort((a, b) => parseInt(a) - parseInt(b));  // Sort files by their numeric value

      // Loop through the sorted files and upload each one
      for (const file of sortedFiles) {
        const filePath = path.join(folderPath, file);

        try {
          await message.channel.send({
            content: `${file}`,
            files: [{
              attachment: filePath,
              name: file
            }]
          });
          console.log(`${file} uploaded successfully!`);
        }
        catch (err) {
          console.error('Error uploading the file:', err);
        }
      }
    });
  };
});

client.login(token);

// const file_path = '/Users/kylerli/The_Gosling-webcomic'; <-- USE THIS LATER WHEN THIS BOT IS READY