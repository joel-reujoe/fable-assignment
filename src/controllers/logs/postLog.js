
const fs = require('fs');

const endOfLine = require('os').EOL

const fileName = `${__dirname}/debug.log`;

Tail = require('tail').Tail;

tail = new Tail(fileName);

tail.on("line", function(data) {
    if(isJsonString(data)){
        data = JSON.parse(data);
        let { id, unix_ts, user_id, event_name } = data;
        client.query(
            'INSERT into logs (id, unix_ts, user_id, event_name) VALUES($1, $2, $3, $4) RETURNING id', 
            [id, unix_ts, user_id, event_name],(err, result)=>{
                if (err) {
                    console.log(err);
                } else {
                    console.log('row inserted with id: ' + result.rows[0].id);
                }
        });
    }
});

tail.on("error", function(error) {
    console.log('ERROR: ', error);
});

// let fileSize = fs.statSync(fileName).size;

// let i = 0;
function isJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

// const parseBuffer = (buffer)=>{
//     // Iterate over each line in the buffer.
//     i++
//     buffer.toString().split(endOfLine).forEach(function (line) {
//         console.log(line, i);
//         if(isJsonString(line)){
//             insert.push(JSON.parse(line));
//             if(insert.length > 100){
//                 for(let i = 0; i < insert.length; i++){
//                     console.log(insert[i]);
//                 }
//             }
//         }
//       // Do stuff with the line :)
//     });
// };

// let log_file = fs.createWriteStream(`${__dirname}/debug.log`, {flags : 'w'});
// let log_stdout = process.stdout;
// fs.watch(fileName, (current, previous)=>{
//     // Convert the file size to megabytes (optional)
//     if (current.mtime <= previous.mtime) { return; }
    
//     let newFileSize = fs.statSync(fileName).size;
//     let sizeDiff = newFileSize - fileSize;
//     // console.log(sizeDiff);

//     if (sizeDiff > 3550) {
//         fileSize = 0;
//         sizeDiff = newFileSize;

//         let buffer = new Buffer(sizeDiff);
//         // Obtain reference to the file's descriptor.
//         let fileDescriptor = fs.openSync(fileName, 'r');
//         // Synchronously read from the file starting from where we read
//         // to last time and store data in our buffer.
//         fs.readSync(fileDescriptor, buffer, 0, sizeDiff, fileSize);
//         fs.closeSync(fileDescriptor); // close the file
//         // Set old file size to the new size for next read.
//         fileSize = newFileSize;

//         // Parse the line(s) in the buffer.
//         parseBuffer(buffer);

//     }
    
//     // fs.readFile(fileName, (err, result)=>{
//     //     result = result.toString();
//     //     let client = global.client;
//     //     if(isJsonString(result)){
//     //         result = JSON.parse(result);
//     //         // if(result.length >50){
//     //             // for(let i = 0; i < result.length; i++){
//     //             let { id, unix_ts, user_id, event_name } = result;
//     //             client.query(
//     //                 'INSERT into logs (id, unix_ts, user_id, event_name) VALUES($1, $2, $3, $4) RETURNING id', 
//     //                 [id, unix_ts, user_id, event_name],
//     //                 function(err, result) {
//     //                     if (err) {
//     //                         console.log(err);
//     //                     } else {
//     //                         console.log('row inserted with id: ' + result.rows[0].id);
//     //                     }
//     //                 } 
//     //             );
//     //             // }
//     //             // fs.writeFile(fileName, JSON.stringify(), function writeJSON(err) {
//     //             //     if (err) return console.log(err);
//     //             //     console.log(JSON.stringify());
//     //             //     console.log('writing to ' + fileName);
//     //             // });
//     //         // }
//     //     }
//     // });
// });

// const postLog = async()=>{
// };

// module.exports = postLog;