const express = require("express")
const app = express();
var listener = app.listen(process.env.PORT || 2000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
app.listen(() => console.log("I'm Ready To Work..! 24H"));
app.get('/', (req, res) => {
  res.send(`
  <body>
  <center><h1>Bot 24H ON!</h1></center
  </body>`)
});require('dotenv').config();  // تحميل المتغيرات من ملف .env

const { Client } = require('discord.js-selfbot-v13');
const { joinVoiceChannel } = require('@discordjs/voice');

const client = new Client({
    checkUpdate: false, 
    ws: { properties: { $os: "linux", $browser: "Discord", $device: "Desktop" } }  
});

client.once('ready', () => {
    console.log(`تم الدخول الى حسابك: ${client.user.tag}`);


    const guildId = process.env.GUILD_ID; 
    const voiceChannelId = process.env.CHANNEL_ID; 
    const guild = client.guilds.cache.get(guildId);
    const voiceChannel = guild.channels.cache.get(voiceChannelId);

    if (voiceChannel && voiceChannel.isVoice()) {
        joinVoiceChannel({
            channelId: voiceChannel.id,
            guildId: guild.id,
            adapterCreator: guild.voiceAdapterCreator,
            selfMute: false, 
            selfDeaf: false  
        });
        console.log(`اشتغل البروجكت اح معجزة`);
    } else {
        console.error('Voice channel not found or invalid.');
    }
});


client.login(process.env.DISCORD_TOKEN);
