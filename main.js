const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');

// const sqlite3 = require('sqlite3').verbose();

// let db = new sqlite3.Database('./data.db', (err) => {
//     if (err) {
//         console.log(err.message);
//     }
//     console.log('connected to db');
// })

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

/* Returns undefined if none, otherwised a Member */
function getFirstMentionedUser(msg) {
    return msg.mentions.members.random();
}

function babyShark(msg) {    
    if (!msg.content.toLowerCase().match(/baby.*shark/)) {
        return;
    }

    const member = getFirstMentionedUser(msg) || msg.member;
    const voiceChannel = member.voiceChannel;

    if (!voiceChannel) {
        return;
    }

    msg.react('🦈');

    voiceChannel.join().then(connection => {
        const dispatcher = connection.playFile('./baby-shark.mp3');
        dispatcher.setVolume(0.05);

        dispatcher.on("end", end => {
            voiceChannel.leave();
        });
    }).catch(err => {
        console.log(err);
        voiceChannel.leave();
    });
}
 
client.on('message', msg => {
    try {
        babyShark(msg);
    } catch (e) {
        console.log(e);
    }
});

client.login(config.token);