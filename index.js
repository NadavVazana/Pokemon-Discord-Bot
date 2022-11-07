const { EmbedBuilder } = require('@discordjs/builders');
const { GatewayIntentBits } = require('discord.js');
const Discord = require('discord.js')
const { MessageAttachment } = require('discord.js')
const client = new Discord.Client({
    allowedMentions:{
        parse:['users','roles'],
        repliedUser:true
    },
        intents: [
            GatewayIntentBits.DirectMessages,
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildBans,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent,
          ],
          partials: [Discord.Partials.Channel],
    
});

const token = 'MTAzOTI3MjUwNDYwMDAzOTQ4NA.G1RsjP.QNqDBLl77DA8-M5WLGzjvzFpQfHf4hojdWH1v0'
const PREFIX = '!'

client.on('ready' ,()=>{
    console.log('i am online!');
})

client.login(token)

client.on('messageCreate', (message)=>{

    if(message.content.startsWith(`${PREFIX}pokemon `)){
        const pokemonName = message.content.substring(9)
         fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
         .then(response=> response.json())
         .then(res => {
            console.log(res);
            message.channel.send({embeds:[new EmbedBuilder().setTitle(`${res.forms[0].name[0].toUpperCase()+res.forms[0].name.substring(1)}`).setThumbnail(`${res.sprites.front_default}`).setDescription(`
            Abilities: ${res.abilities[0].ability.name}, ${res.abilities[1].ability.name}`).setColor(0x0099FF)]})
   
})
         .catch(error=> message.channel.send('Could not find the pokemon 😢'))

        

    }


})