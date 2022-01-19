const Discord = require("discord.js");
const prefix = "!" ;
const Bot = new Discord.Client({intents: [
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_MEMBERS,
    Discord.Intents.FLAGS.GUILD_BANS,
    Discord.Intents.FLAGS.GUILD_MESSAGES,
    Discord.Intents.FLAGS.DIRECT_MESSAGES,


]});

const { Permissions } = require('discord.js');

const flagsPermissions = new Permissions([
	Permissions.FLAGS.MANAGE_CHANNELS,
	Permissions.FLAGS.EMBED_LINKS,
	Permissions.FLAGS.ATTACH_FILES,
	Permissions.FLAGS.READ_MESSAGE_HISTORY,
	Permissions.FLAGS.MANAGE_ROLES,
]);

const BanPermissions = new Permissions(Permissions.FLAGS.BAN_MEMBERS);
const kickPermissions = new Permissions(Permissions.FLAGS.KICK_MEMBERS);


//lancement du bot
Bot.on("ready", async () => {
    console.log("bot prêt");
    Bot.user.setStatus("dnd");
    Bot.user.setActivity("s'abonné à Tominou");
}); 

//arriver d'un member
Bot.on("guildMemberAdd", member => {
    console.log("un membre est arrivée");
    Bot.channels.cache.get("931928298030772315").send("Hey <@" + member.id + "> bievenue sur **Communauté-Tominou**!");
    member.roles.add("922200633635930173");
    member.send("Bienvenue sur le serveur Communauté-Tominou! N'oublie pas d'aller lire le reglement.");
});

//depart d'un membre
Bot.on("guildMemberRemove", member => {
    console.log("Un membre a quitter le serveur");
    Bot.channels.cache.get("931928298030772315").send("<@" + member.id + "> est partie de Communauté-Tominou!");
});

//commande de ban
Bot.on("messageCreate", async message => { 
    //Message handle
    if(message.author.bot) return; 
    if(message.channel.type == "dm") return;

    if(!message.member.permissions.has("BAN_MEMBERS")) return;

        if(message.content.startsWith(prefix + "ban")){
            let mention = message.mentions.members.first();

               if(mention == undefined){
                message.reply("Membre introuvable");
                
                }
                else{
                    if(mention.bannable){
                       mention.ban();
                       message.channel.send(mention.displayName + "a été banni avezc succès!");
                    }
                    else{
                        message.reply("Imposible de bannir ce membre.") 
             }
         }
     }
});

//mon tweeter
Bot.on("messageCreate", async message => {
    if (message.content === "!tweeter") {
      message.channel.send("Le twiter de Tominou est: https://twitter.com/Tominou92350")
    }
});

//mon instagram
Bot.on("messageCreate", async message => {
    if (message.content === "!instagram") {
        message.channel.send("Le instagram de Tominou est: https://www.instagram.com/tominou92350/?hl=fr")
    }
});

//mon twitch
Bot.on("messageCreate", async message => {
    if (message.content === "!twitch") {
        message.channel.send("La chaine twitch de Tominou est: https://www.twitch.tv/tominou92350")
    }
});

//mon youtube
Bot.on("messageCreate", async message => {
    if (message.author.bot) return;

    if (message.content === "!youtube") {
        message.channel.send("La chaine youtube de Tominou est: https://www.youtube.com/channel/UC-uGcMFMlDhJhshgzLNEx-Q")
    }
});

//s'abonner a Tominou
Bot.on("messageCreate", async message => {
    if (message.author.bot) return;

    if (message.content === "!s'abonner à Tominou") {
        message.channel.send("Tu as reçu le résulta de la commande en mp.");

        message.member.roles.add("932021943115346041");
        console.log("un membre a reçu le role [Têster de commande]");

        message.member.send("N'oublie pas de t'abonner à Tominou😉.Garde le secret du résulta de la comande. Et aussi tu as reçu le role [Têster de commande] sur le serveur discord.");
        console.log("un membre a recut un message apres la commande: s'abonner à Tominou.")
    }
});

//donner la liste des commandes avec embed
Bot.on("messageCreate", async message => {
    if (message.author.bot) return;

    if (message.content === "!help"){
        const embed = new Discord.MessageEmbed()
        .setTitle("Liste des commandes:")
        .setColor("#00FF00")
        .setTimestamp()
        .setFooter("©")
        .addField("!__help__", "Affiche la liste des commandes.")
        .addField("!tweeter", "Donne le lien du tweeter de Tominou.")
        .addField("!notif_tweeter", "Donne le rôle pour recevoir une notif pour chaque nouveau tweete.")
        .addField("!instagram", "Donne le lien du instagram de Tominou.")
        .addField("!notif_instagram", "Donne le rôle pour recevoir une notif a chaque nouveau poste.")
        .addField("!twitch", "Donne le lien de la chaine twitch de Tominou.")
        .addField("!notif_twitch", "Donne le rôle pour recevoir une notif a chaque nouveau live.")
        .addField("!youtube", "Donne le lien de la chaine youtube de Tominou.")
        .addField("!notif_youtbe", "Donne le rôle pour recevoir une notif a chaque nouvelle vidéo.")
        .addField("!minecraftpack", "Donne le pack minecraft de Tominou.")
        .addField("!paladiumpack", "Donne le pack paladium de Tominou.")
        .addField("!code", "Donne le lien du code du bot Communauté-Tominou.")
        .addField("!s'abonner à Tominou", "Test et tu veras.");
        

        message.channel.send({ embeds: [embed]});
    }
});

//donner la liste des commandes admin avec embed
Bot.on("messageCreate", async message => {
    if (message.author.bot) return;

    if (message.content === "!helpadmin"){
        const embed = new Discord.MessageEmbed()
        .setTitle("Liste des commandes administrateur:")
        .setColor("#FF0000")
        .setTimestamp()
        .setFooter("©")
        .addField("!__helpadmin__", "Affiche la liste des commandes administrator.")
        .addField("!ban", "Ban un membre du serveur discord.");
        

        message.channel.send({ embeds: [embed]});
    }
});

//notif tweeter
Bot.on("messageCreate", async message => {
    if (message.author.bot) return;

    if (message.content === "!notif_tweeter"){
        message.channel.send("Tu as bien reçu le role [notif_tweeter].")

        message.member.roles.add("932029959873105940");
        console.log("un membre a reçu le role [notif_tweeter].")
    }
});

//notif instagram
Bot.on("messageCreate", async message => {
    if (message.author.bot) return;

    if (message.content === "!notif_instagram"){
        message.channel.send("Tu as bien reçu le rôle [notif_instagram].")

        message.member.roles.add("932031010915356673");
        console.log("un membre a reçu le rôle [notif_instagram].")
    }
});

//notif twitch
Bot.on("messageCreate", async message => {
    if (message.author.bot) return;

    if (message.content === "!notif_twitch"){
        message.channel.send("Tu as bien reçu le rôle [notif_twitch].")

        message.member.roles.add("932035114693718087");
        console.log("un membre a reçu le rôle [notif_twitch].")
    }
});

//notif youtube
Bot.on("messageCreate", async message => {
    if (message.author.bot) return;

    if (message.content === "!notif_youtube"){
        message.channel.send("Tu as bien reçu le rôle [notif_youtube].")

        message.member.roles.add("932036055627075624");
        console.log("un membre a eu le role [notif_youtube]");
    }
});


//pack minecraft
Bot.on("messageCreate", async message => {
    if (message.author.bot) return;

    if (message.content === "!minecraftpack"){
        message.channel.send("Le lien du pack t'as été envoyer en privée.")

        message.member.send("Voici le lien de téléchargement du pack minecraft de Tominou: https://www.mediafire.com/file/6doh3stpr2bdsr7/%2521_%25C2%25A74Demon_Slayer_%25C2%25A7fPack.zip/file");
    }
});

//pack paladium
Bot.on("messageCreate", async message => {
    if (message.author.bot) return;

    if (message.content === "!paladiumpack"){
        message.channel.send("Le lien du pack t'as été envoyer en privée.")
        
        message.member.send("Voici le lien de téléchargement du pack paladium de Tominou: https://www.mediafire.com/file/ip0bafenwowa3vu/Pack_Lunaire_%25281%2529.zip/file");
        console.log("un membre a eu le code du bot et le role [code du bot].");
    }
});

//code du bot
Bot.on("messageCreate", async message => {
    if (message.author.bot) return;

    if (message.content === "!code"){
        message.channel.send("Le code du bot: Communauté-Tominou t'as été envoyer un messae privée.")

        message.member.send("Voici le lien du code du bot Communauté-Tominou: https://github.com/Tominou92350/Communaut--Tomiou-v1");
        message.member.roles.add("932306939449323530");
        console.log("un membre a récupérer le code du bot.");
    }
});

//token de mon bot
Bot.login(process.env.TOKEN);