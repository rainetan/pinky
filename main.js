const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');

const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./data.db', (err) => {
    if (err) {
        console.log(err.message);
    }

    console.log('connected to db');
})
 
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
 
client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('pong');
  }
});
 
client.login(config.token);