const http= require("http");
//var os = require("os");
const url = require('url'); 
const { getComments, searchVideo }= require("./scraping");

//const hostname = "web-scrapper-g746.onrender.com";
const PORT = process.env.PORT || 3000;



function requestHandler(req, res){
    res.setHeader('Content-Type','application/json');

    let json={
        status: 500,
        body: null
    }

    let parseURL= url.parse(req.url, true);
    let path= parseURL.pathname;
    let query= parseURL.query;
    let userAgent= req.headers["user-agent"];
    
    
    if(Object.keys(query).length !== 0 && path === '/search' && req.method === "GET"){
        /**
         * Alway encode keyword value with encodeURI before passing it as parameter. 
         */
        let keyword= decodeURI(query.keyword).replaceAll(" ", "+");
        let searchURL= "https://www.youtube.com/results?search_query="+keyword;
        (async ()=>{
            json.body= await searchVideo(userAgent, searchURL);
            json.status= 200;
            res.writeHead(200); // Status code 200 = OK
            res.end(JSON.stringify(json));
        })();
    }else if(Object.keys(query).length !== 0 && path === '/comments' && req.method === "GET"){
        /**
         * url has already be enconded by  searchVideo(); Just pass value as recieved
         */
        let url= decodeURIComponent(query.video_url);
        (async ()=>{
            json.body= await getComments(userAgent, url);
            json.status= 200;
            res.writeHead(200); // Status code 200 = OK
            res.end(JSON.stringify(json));
        })();
    }else{
        json.status= 400;//Bad Request
        res.writeHead(400); // Status code 200 = OK
        res.end(JSON.stringify(json));
    }
}

// //Create Server
const server= http.createServer(requestHandler);

//Initiaize server to listen
server.listen(PORT, () => {
    //console.log(`Server running at http://${hostname}:${port}/`);
    console.log(`Server running at port: ${PORT}`);
});
