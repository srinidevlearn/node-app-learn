const net = require("net");
const connection = { host: "127.0.0.1", port: 2020 };

const getConnectionsInfo = () => {
  server.getConnections((error, res) => {
    console.dir(res);
  });
};

let client = [];

server = net.createServer((id,socket) => {
  server.getConnections(getConnectionsInfo);
  let tempSockReference = socket;
  socket.write('Data');
  tempSockReference.pipe(socket)
});

server.listen(connection);

let clientConnections = net.createConnection(connection, (err, res) => {
  clientConnections.on("data", (bufferData) => {
    console.log(bufferData.toString());
  });
});

let clientConnections1 = net.createConnection(connection, (err, res) => {
  clientConnections.on("data", (bufferData) => {
    console.log(bufferData.toString());
  });
});
let clientConnections2 = net.createConnection(connection, (err, res) => {
  clientConnections.on("data", (bufferData) => {
    console.log(bufferData.toString());
  });
});
