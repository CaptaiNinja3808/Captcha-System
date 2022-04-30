 const Discord = require("discord.js");

 const client = new Discord.Client({
   fetchAllMembers: false,
   restTimeOffset: 0,
   failIfNotExists: false,
   shards: "auto",
   allowedMentions: {
     parse: ["roles", "users"],
     repliedUser: false,
   },
   partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'GUILD_MEMBER', 'USER'],
   intents: [Discord.Intents.FLAGS.GUILDS,
   Discord.Intents.FLAGS.GUILD_MEMBERS,
   Discord.Intents.FLAGS.GUILD_BANS,
   Discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
   Discord.Intents.FLAGS.GUILD_INTEGRATIONS,
   Discord.Intents.FLAGS.GUILD_WEBHOOKS,
   Discord.Intents.FLAGS.GUILD_INVITES,
   Discord.Intents.FLAGS.GUILD_VOICE_STATES,
   Discord.Intents.FLAGS.GUILD_PRESENCES,
   Discord.Intents.FLAGS.GUILD_MESSAGES,
   Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
   Discord.Intents.FLAGS.DIRECT_MESSAGES,
   Discord.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
   ]
 });

const guildId = 'GuildID'
client.on("guildMemberAdd", async (member) => {
    if(!guildId) return
    const { Captcha } = require('captcha-canvas')
    const { MessageAttachment } = require('discord.js')
    
    const captcha = new Captcha();
captcha.async = true;
captcha.addDecoy();
captcha.drawTrace();
captcha.drawCaptcha();

const captchaAttachment = new Discord.MessageAttachment(
    await captcha.png,
    "captcha.png"
);

const msg = await member.send({ 
    files: [captchaAttachment],
    content: "Solve the captcha. You have ten minute, then I kick you.",
    });
    

    const filter = (message) => {
        if(message.author.id !== member.id) return;
        if(message.content == captcha.text) return true;
        else member.send("Wrong captcha")
    }

    try {
    const response = await msg.channel.awaitMessages({ 
        filter,
        max:1,
        time: 600000,
        errors: ["time"],
    });

    if(response) {
        //when verified
        member.roles.add('user-role');
        member.send('You have been verified')
    }
} catch (err) {
    //no time and not verified
    await member.send("You haven't verified and i kicked u")
    member.kick("Haven't answered captcha")
}
})

/************************************

-DEVELOPED BY captaiNinja3808#7956

-TEAM: RareOre

-NO CREDITS, I LOVE YOU GUYS

************************************/
