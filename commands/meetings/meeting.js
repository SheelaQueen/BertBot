const commando = require('discord.js-commando');

/* Config */
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('configuration.json'));
const meetings = JSON.parse(fs.readFileSync('commands/meetings/meetings.json'));
const moment = require('moment');
const formatJSON = require('json-format');

class Meeting extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'meeting',
      group: 'custom',
      memberName: 'meeting',
      description: 'Creates a custom command **R**',
      args: [{
        key: 'action',
        prompt: 'Add or delete a meeting.',
        type: 'string'
      },
      {
        key: 'description',
        prompt: 'Description of the meeting',
        type: 'string',
        default: ''
      },
      {
        key: 'day',
        prompt: 'Day of the meeting',
        type: 'string',
        default: ''
      },
      {
        key: 'month',
        prompt: 'Month of the meeting',
        type: 'string',
        default: ''
      },
      {
        key: 'time',
        prompt: 'Time of the meeting',
        type: 'string',
        default: ''
      }]
    });
  }
  hasPermission(message) {
    return message.member.roles.some(r => config.restrictedCommandRoles.includes(r.name));
  }

  async run(message, { action, description, day, month, time }) {
    if(action == 'add') {
      if(!meetings.meetings) {
        fs.writeFile('commands/meetings/meetings.json', JSON.stringify({ "meetings": [] }), function(err) {
          
        });
      }
      var date = moment([ moment().year(), moment().month(month).format('M') - 1, parseInt(day), parseInt(time.split(':')[0]), parseInt(time.split(':')[1])]).toObject();
      var remaining = moment(date).diff(moment(), 'days');
      date.description = description;
      meetings.meetings.push(date);
      fs.writeFile('commands/meetings/meetings.json', JSON.stringify(meetings), function(err) {
        process.exit();
      });
    }else if(action == 'remove') {
      for(var i = 0; i < meetings.meetings.length; i++) {
       if(meetings.meetings[i].description == description || meetings.meetings[i].day == parseInt(day) && meetings.meetings[i].month == moment().month(month).format('M') - 1) {
         meetings.meetings.splice(i, 1);
         fs.writeFile('commands/meetings/meetings.json', JSON.stringify(meetings), function(err) {
           process.exit();
         });
       }
      }
    }else {
      message.channel.send('You must specify `add` or `remove` for this command.');
    }
             
  }
}
module.exports = Meeting;

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function removeFromArray(arr, value) {

   return arr.filter(function(ele){
       return ele != value;
   });

}