const https = require('https');
const crypto = require('crypto');
const fs = require('fs');

let start = Date.now();

function doRequest(){
    https.request('https://www.google.com',(res)=>{
    res.on('data',(res,err)=>{
        // var textChunk = res.toString('utf8');
        // console.log(textChunk)
    });
    res.on('end',()=>{
        console.log('Network',Date.now()-start)
    });
    }).end();
}

function doHash(){
    return crypto.pbkdf2('123','my-app',100000,512,'sha512',()=>{
        console.log('Hashed : ',Date.now()-start)
    })
}

doRequest();node
fs.readFile('index.js','utf-8',(err,res)=>{
    console.log('FS:',Date.now()-start);
}) 

doHash();
doHash();
doHash();
doHash();
doHash();
doHash();


// const http = require('http');
// http.createServer((req,res)=>{
//     res.write('<p>Hello World</p>')
// }).listen(5050)