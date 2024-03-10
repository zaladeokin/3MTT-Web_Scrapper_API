const http= require("http");
const puppeteer= require("puppeteer");
// const { get }= require("./fetch");

const hostname = 'localhost';
const port = 8000;


async function searchVideo(userAgent){
    let url= "https://www.youtube.com/results?search_query=mission+impossible";
    const browser= await puppeteer.launch();
    const page= await browser.newPage();
    await page.setUserAgent(userAgent);
    await page.goto(url);
    
    const data= await page.evaluate(async ()=>{
        let data= [];
        const titles= document.querySelectorAll('h3.ytd-video-renderer');
        for(const title of titles){
            const video={
                title : title.textContent.trim(),
                link : title.querySelector('a').href
            }
            data.push(video);
        }
        return data;
    });

    console.log(data);

    await browser.close();
}

async function getComments(userAgent){
    let url= "https://www.youtube.com/watch?v=qApf1rF5Tpg&pp=ygUSbWlzc2lvbiBpbXBvc3NpYmxl";
    const browser= await puppeteer.launch();
    const page= await browser.newPage();

    await page.setViewport({
        width: 1280,
        height: 800
    });

    await page.setUserAgent(userAgent);

    await page.goto(url);
    
    const data= await page.evaluate(async ()=>{
        // window.scrollBy(0,800)
        let data= [];
        const comments= document.querySelectorAll('.ytd-comment-renderer > #comment-content #content');
        for(const comment of comments){
            data.push(comment.textContent.trim());
        }
        return data;
    });

    console.log(data);

    await browser.close();
}




function requestHandler(req, res){
    // searchVideo();
    let userAgent= req.headers["user-agent"];
    getComments(userAgent);
    res.writeHead(200); // Status code 200 = OK
    // res.write(html);
    res.end("ejjj");
}

// //Create Server
const server= http.createServer(requestHandler);

//Initiaize server to listen
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});