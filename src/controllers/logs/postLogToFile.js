
const fs = require('fs');
const util = require('util');
const fileName = 'file.json';


function isJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

var log_file = fs.createWriteStream(`${__dirname}/debug.log`, {flags : 'w'});
var log_stdout = process.stdout;
const postLogToFile = async(payload)=>{
    log_file.write(util.format(JSON.stringify(payload)) + '\n');
    log_stdout.write(util.format(JSON.stringify(payload)) + '\n');
};

module.exports = postLogToFile;