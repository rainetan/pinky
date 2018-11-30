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
  client.guilds.forEach((guild) => {
    console.log(guild.name);
  });
});

/* Returns undefined if none, otherwised a Member */
function getFirstMentionedUser(msg) {
    return msg.mentions.members.random();
}
function shouldPlayClip(msg) {
    let key = msg.content.toLowerCase();
    if (config.sounds.hasOwnProperty(key)) {

        // confirm!
        msg.react('✅');

        // get channel info
        const member = getFirstMentionedUser(msg) || msg.member;
        const voiceChannel = member.voiceChannel;

        playSound(voiceChannel, config.sounds[key].file, config.sounds[key].level);
    }
}

function playSound(voiceChannel, fileName, level) {
    if (!voiceChannel) {
        return;
    }

    voiceChannel.join().then(connection => {
        const dispatcher = connection.playFile(`./sounds/${fileName}.mp3`);
        dispatcher.setVolume(level);

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
        shouldPlayClip(msg);
    } catch (e) {
        console.log(e);
    }
});

// client.on('guildMemberAdd', member => {
//     const channel = member.guild.channels.find(ch => ch.name === config.welcomeChannel);
//     if (!channel) {
//         return;
//     }

//     channel.send(`user joined: ${member}, click to promote`).then((msg) => {
//         msg.react('⏫');

//         handleReaction(msg, '', () => {
//             const roleId = member.guild.roles.filter((role) => role.name === config.pugRole).first();
//             member.addRole(roleId);
//         });
        
//     });
// });

// function handleReaction(msg, emoji, cb) {
//     const collector = msg.createReactionCollector(() => true, {dispose: true});
//     collector.on('collect', (element) => {
//         if (element.count > 1) {            
//             collector.stop();
//             //msg.delete();
//             msg.react('✅');
//         }
//     });
//     collector.on('end', () => {
//         cb();
//     });
// }

client.login(config.token);