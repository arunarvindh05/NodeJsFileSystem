const express = require('express');
require('dotenv').config();
const app = express();

app.use(express.json());
var fs = require("fs");

app.get('/', (req, res) => {
    res.status(200).send('Welcome to NodeJS File System')
})

//1. API end point to create and Write timestamp in the particular folder
app.get('/write', (req, res) => {
    try{
        const currentDate = new Date();
        var folder ="Pfolders/"+currentDate.getDate()+"-"+currentDate.getTime()+".txt";
        var writeStream = fs.createWriteStream(folder);
        writeStream.write(currentDate.toString());
        writeStream.end();
        res.status(200).send('File created successfully')
    }catch(error){
        res.status(500).send({message: 'Internal Server Error'});
    }
})

//2. Retrieve all the folders in the particular folder
app.get('/readFiles', (req, res) => {
    try{
        fs.readdir("Pfolders", function (err, files) {
            //handling error
            if (err) {
                return res.status(400).send({message: 'Error while retrieving files.'})
            } 
            var obj={}
            files.forEach(function (file) {
                console.log(file); 
                var fil = fs.readFileSync("Pfolders/"+file,'utf-8');//reading text file
                console.log("Reading data: "+fil)
                obj[file]=fil
            });
            res.status(200).send(JSON.stringify(obj))
        });
    }catch(error){
        res.status(500).send({message: 'Internal Server Error'});
    }
    
})

const PORT = process.env.PORT;
app.listen(8080, () => {
    console.log(`App is running on PORT ${PORT}`)
})

