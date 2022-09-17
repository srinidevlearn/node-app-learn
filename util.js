
const http = require('http');
const queryString = require('querystring')
const urlModule = require('url');

const {STATUS_CODES} = http;


function santizeRequest(request){
    let url = urlModule.parse(request.url,true)
    let querParsed = {... url.query}
    url = {...url,...{sanitisedQuery:querParsed}};
    let { search,sanitisedQuery,pathname,path,href} = url
    return({ search,sanitisedQuery,pathname,path,href})
}

module.exports = {
    STATUS_CODES,
    santizeRequest
}