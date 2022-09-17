const http = require('http');
const { StringDecoder } = require('string_decoder');
const { STATUS_CODES,santizeRequest } = require('./util');



function requestIncomingHandler(request,response){

    switch (true) {
        case (request.method === 'GET'):{

            handleGETRequest(request,response)
            break;
        }

        case (request.method === 'POST'):{

            handlePOSTRequest(request,response)
             

            break;
        }
            
    
        default: response.end()
    } 
}




function handleGETRequest(request,response){
   
 
    let { search,sanitisedQuery,pathname,path,href} = santizeRequest(request);
    
    if(pathname === '/data'){
        response.writeHead(200,STATUS_CODES[200],{'Content-type':'application/json'});
        response.write(JSON.stringify({ search,sanitisedQuery,pathname,path,href}));
        response.end();
    }
  
    response.writeHead(404, { "Content-Type": "text/html" });
    response.write(`
    <!doctype html>
    <html>
    <head>
    <title>404</title>
    </head>
    <body>
    404: Resource Not Found
    </body>
    </html>`);
    response.end();

}

function handlePOSTRequest(request,response){
    let { search,sanitisedQuery,pathname,path,href} = santizeRequest(request);

    if(pathname === '/postData'){
        let body = ''
        request.on('data',(chunkOfData)=>{

            body += chunkOfData.toString();

                // body += new StringDecoder().write(chunkOfData)

        })

        request.on('end',()=>{
            // body += new StringDecoder().end()

            console.log(body);
    response.writeHead(200,'OK', { "Content-Type": "text/plain" });

            response.write(body);
            response.end();
        })

    }

    // response.end()

}




const server = http.createServer(requestIncomingHandler);

server.listen(8080);
