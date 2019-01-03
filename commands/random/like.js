const commando = require('discord.js-commando');
const Discord = require('discord.js');

/* Config */
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('configuration.json'));

class Like extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'like',
      group: 'random',
      memberName: 'like',
      description: 'Tells you the amount of likes you have.',
      // throttling: {
      //   usages: 1,
      //   duration: 30
      // },
      args: [{
        key: 'term',
        prompt: 'Would you like to display the top 5 liked members or your count?',
        type: 'string',
        default: ''
      }]
    });
  }
  async run(message, { term }) {
    fs.readFile('commands/random/likes.json', function(err, response) {
      if(err) {
        console.log(err);
      }
      var data = JSON.parse(response);
      var people = [];
      var likes = [];
      var indexes;
      if(term == 'top') {
        for(var member in data) {
          people.push(member);
          likes.push(data[member]);
        }
        console.log(people);
        console.log(likes);
        for(var i = 0; people.length > 5; i++) {
          var top = likes.sort
        }
        
        console.log(people);
        console.log(likes);
        
        //let embed = new Discord.RichEmbed().setTimestamp(Date.now()).setColor("#127ABD").setTitle(`**Top Liked Users**`).setDescription(`**1. ** ${}\n\n**Meeting Plans:** ${meetings.meetings[i].description}`);
      }else if(term == 'count') {
        if(data[message.author.username]) {
        message.author.send("You have " + data[message.author.username] + " likes!");
      }else {
        message.author.send("You do not have any likes yet.");
      }
      }
    });
  }
}
module.exports = Like;
