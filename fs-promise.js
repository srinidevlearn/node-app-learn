// const fsP = require("fs/promises");
const fs = require("fs")

const os = require('os');

const path = require('path')

// // let start =  Date.now();
// // const myreadfile = async()=>{
// //  capD = '';
// //     try{
// //         capD= await fs.readFile('fs-promise.js','utf-8').then(d=>(capD = d));
// //     }catch(e){
// //         console.error(e)
// //     }finally{
// //         console.log(Date.now()- start,capD);
// //     }
// // }


// const myreadfileSync = async()=> {
//     let d = fs.readFileSync('fs-promise.js','utf-8')
//     console.log(d)
//     console.log(Date.now()- start);
// }
// function copyFileInStreamNoError(from, to) {
//     const source = fs.createReadStream(from);
//     const dest = fs.createWriteStream(to);
//     return source.pipe(dest);
//   }
// const fileAsStream = () =>{
//     let fstream = fs.createReadStream('fs-promise.js',)
//     fstream.on('data',(chunkOfData)=>{
//         console.log(chunkOfData.toString())
//     })

//     fstream.pipe(fs.createWriteStream('destination.js'))
// }

// fileAsStream();

const writeNewFile = () => fs.writeFile('destination.js',`console.log('Hello World')`,(err,data)=>{
    if(err) console.log(err);
})

// writeNewFile();

const writeNewFileUsingSync = () => fs.writeFileSync('destination.js',`console.log('Hello World using Sync')`)

// writeNewFileUsingSync();


const appendFileOperation = () => fs.appendFile('destination.js',+os.EOL+"console.log('I have appended the things')"+os.EOL,(err,data)=>{
    if(err) console.log(err);
})

// appendFileOperation();

const renameFile = () =>fs.rename('destination.js','destination.txt',(err,data)=>{
    if(err)console.log(err);
})

// const deletFile = () => fs.unlink('destination.js',(err)=>console.error(err));
// deletFile();

// renameFile();

const destFilePath =  'destination.txt'

const copyMyfile =()=> fs.copyFile(destFilePath,'new'+destFilePath,(err,data)=>{
    if(err) console.log(err)
})

// copyMyfile();

const resolvedPath = path.resolve('./tempwork/asset/mocks/dummy.txt');
console.log(resolvedPath);
