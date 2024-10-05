require('dotenv').config();  // تحميل المتغيرات من ملف .env

const { Client } = require('discord.js-selfbot-v13');
const { joinVoiceChannel } = require('@discordjs/voice');

// إنشاء سيلف بوت باستخدام حسابك الشخصي
const client = new Client({
    checkUpdate: false,  // لتعطيل التحقق من التحديثات
    ws: { properties: { $browser: "Discord Client" } }  // يظهر وكأنه متصل عبر الكمبيوتر
});

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);

    // استرجاع المتغيرات من .env
    const guildId = process.env.GUILD_ID;  // استرجاع ID السيرفر
    const voiceChannelId = process.env.CHANNEL_ID;  // استرجاع ID القناة الصوتية

    const guild = client.guilds.cache.get(guildId);
    const voiceChannel = guild.channels.cache.get(voiceChannelId);

    // الانضمام إلى القناة الصوتية بدون deaf أو mute
    if (voiceChannel && voiceChannel.isVoice()) {
        joinVoiceChannel({
            channelId: voiceChannel.id,
            guildId: guild.id,
            adapterCreator: guild.voiceAdapterCreator,
            selfMute: false,  // عدم تفعيل mute
            selfDeaf: false   // عدم تفعيل deafen
        });
        console.log(`Joined voice channel: ${voiceChannel.name} without mute or deafen`);
    } else {
        console.error('Voice channel not found or invalid.');
    }
});

// تسجيل الدخول باستخدام توكن الحساب الشخصي
client.login(process.env.DISCORD_TOKEN);  // استخدام توكن الحساب الشخصي من .env
