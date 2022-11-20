//1. API end point to create and Write timestamp in the particular folder
var fs = require("fs");
const currentDate = new Date();
var folder ="Pfolders/"+currentDate.getDate()+"-"+currentDate.getTime()+".txt";
var writeStream = fs.createWriteStream(folder);
writeStream.write(currentDate.toString());
writeStream.end();

//2. Retrieve all the folders in the particular folder
fs.readdir("Pfolders", function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    files.forEach(function (file) {
        console.log(file); 
        var fil = fs.readFileSync("Pfolders/"+file,'utf-8');//reading text file
        console.log("Reading data: "+fil)
    });
});