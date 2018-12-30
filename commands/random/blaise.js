const DadJokes = require('dadjokes-wrapper');
const dj = new DadJokes();
const commando = require('discord.js-commando');

/* Config */
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('configuration.json'));

class Blaise extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'blaise',
      group: 'random',
      memberName: 'blaise',
      description: 'Tells a dad joke.',
      throttling: {
        usages: 1,
        duration: 60
      },
      args: [{
        key: 'term',
        prompt: 'What would you like the joke to be about?',
        type: 'string',
        default: ''
      }]
    });
  }
  async run(message, { term }) {
    if(config.blaiseWhitelistedChannelNames.includes(message.channel.name) || config.blaiseWhitelistedChannelNames.includes("allowAll")) {
      if(term) {
        dj.searchJoke({'term': term}).then(function(res) {
          if(res) {
            message.channel.send(res.results[Math.floor(Math.random() * res.results.length)].joke);
          }else {
            message.channel.send('Sorry, there are no jokes with that keyword');
          }
        });
      } else {
        dj.randomJoke().then(function(res) {
          message.channel.send(res);
        });
      }
    }
  }
}
module.exports = Blaise;
