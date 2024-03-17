const Command = require("./command");
const Message = require("./message");

class Rover {
   // Write code here!
   
   constructor (position) {
      this.position = position;
      this.mode = 'NORMAL';
      this.generatorWatts = 110;
   }

   receiveMessage(message) {
      let results = [];

    message.commands.forEach(command => {
        let result = {};

        switch (command.commandType) {
            case 'STATUS_CHECK':
                result.completed = true;
                result.roverStatus = {
                    mode: this.mode,
                    generatorWatts: this.generatorWatts,
                    position: this.position
                };
                break;
            case 'MODE_CHANGE':
                this.mode = command.value;
                result.completed = true;
                break;
            case 'MOVE':
                if (this.mode === 'LOW_POWER') {
                    result.completed = false;
                } else {
                    this.position = command.value;
                    result.completed = true;
                }
                break;
        }

        results.push(result);
    });

    return {
        message: message.name,
        results: results
    };
};
}

module.exports = Rover;

   //console.log(JSON.stringify(response, null. 2));