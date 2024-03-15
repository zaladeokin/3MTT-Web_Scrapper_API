const puppeteer= require("puppeteer");

async function searchVideo(userAgent, url){
    const browser= await puppeteer.launch();
    const page= await browser.newPage();
    await page.setUserAgent(userAgent);
    await page.goto(url, {timeout: 0});
    
    const data= await page.evaluate(async ()=>{
        let data= [];
        const titles= document.querySelectorAll('h3.ytd-video-renderer');
        for(const title of titles){
            const video={
                title : title.textContent.trim(),
                link : encodeURIComponent(title.querySelector('a').href)
            }
            data.push(video);
        }
        return data;
    });

    await browser.close();

    return data;
}

async function getComments(userAgent, url){
    const browser= await puppeteer.launch();
    const page= await browser.newPage();

    await page.setViewport({
        width: 1280,
        height: 800
    });

    await page.setUserAgent(userAgent);

    await page.goto(url, {timeout: 0});
    
    const data= await page.evaluate(async ()=>{
        //  window.scrollBy(0,800)
        let data= [];
        const comments= document.querySelectorAll('.ytd-comment-renderer > #comment-content #content');
        for(const comment of comments){
            data.push(comment.textContent.trim());
        }
        return data;
    });

    await browser.close();

    return data
}



module.exports= { getComments, searchVideo }