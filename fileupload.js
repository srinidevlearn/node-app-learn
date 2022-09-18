// run `node index.js` in the terminal

const http = require("http");
const urlM = require("url");
const formidable = require("formidable");
const fs = require("fs");
const path = require("path");
const os = require("os");

var dir = path.resolve("./tmp/img");

let start = Date.now()
let d = fs.readFileSync('fileupload.js','utf-8')
console.log(Date.now()- start)

console.log(`Hello Node.js v${process.versions.node}!`);

const fileuploadTemplate = `<!DOCTYPE html>
<form action="/upload" method="POST" enctype="multipart/form-data">
    <input type="file" name="image" />
    <button type="submit">Upload</button>
</form>`;

const server = http
  .createServer((req, res) => {


    // fs.stat(path.resolve('tmp/img/Untitled.png'), (err, stats) => {
    //   console.log("async", stats.size);
    // });

    let url = urlM.parse(req.url, true);

    if (url.pathname === "/upload") {
      if (req.method === "POST") {
        let form = new formidable.IncomingForm();
        let fields = [];
        let files = [];
        form
          .on("field", (field, value) => {
            fields.push({ [field]: value });
          })
          .on("file", (field, upfile) => {
            files.push({ [field]: { ...upfile } });
          })
          .on("end", () => {
            if (!fs.existsSync(dir)) {
              fs.mkdirSync(dir, { recursive: true });
            }
            // console.log(fs.readdirSync('./tmp'))
            let src = files[0]["image"]["filepath"];
            let dest = path.resolve(
              dir + "/" + files[0]["image"]["originalFilename"]
            );
            copySync(src, dest);

            res.write("uploaded successfully");
            res.end();
          });
        form.parse(req);
      }
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(fileuploadTemplate);
      res.end();
    }
  })
  .listen(8080);

function actuallycopyfile(from, to) {
  fs.copyFile(from, to, (err) => {
    if (err) throw err;
  });
}

function copySync(from, to) {
  var data = fs.readFileSync(from);
  fs.writeFileSync(to, data);
}
function copyFileasPromise(from, to) {
  const source = fs.createReadStream(from);
  const dest = fs.createWriteStream(to);

  return new Promise((resolve, reject) => {
    source.on("end", resolve);
    source.on("error", reject);
    source.pipe(dest);
  });
}
function copyFileInStreamNoError(from, to) {
  const source = fs.createReadStream(from);
  const dest = fs.createWriteStream(to);
  return source.pipe(dest);
}

function moveFile2(from, to) {
  fs.readFile(from, function (err, data) {
    fs.writeFile(to, data, function (err) {
      fs.unlink(from, function () {
        if (err) console.log(err);
      });
    });
  });
}
