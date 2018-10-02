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


function babyShark(msg) {
    if (!msg.content.toLowerCase().match(/baby.*shark/)) {
        return;
    }

    var voiceChannel = msg.member.voiceChannel;
    console.log(voiceChannel);
    voiceChannel.join().then(connection => {
        const dispatcher = connection.playFile('./baby-shark.mp3');
        dispatcher.setVolume(0.05);
        dispatcher.on("end", end => {
            voiceChannel.leave();
        });
    }).catch(err => {
        console.error(err);
        voiceChannel.leave();
    });
}
 
client.on('message', msg => {

    babyShark(msg);
    if (msg.content === 'ping') {
        msg.reply('pong');

    }
});
 
client.login(config.token);
