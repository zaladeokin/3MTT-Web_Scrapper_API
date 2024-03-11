# YouTube Video Comment Scraper API

A Node.js web scraper API for scraping comments from YouTube videos.

## Table of Contents

- [Installation](#installation)
- [Endpoints](#endpoints)
- [Contact](#Contact)

## Installation

Clone the repository:

```bash
git clone https://github.com/your-username/your-repo.git
```

Install dependencies:

```bash
cd your-repo
npm install puppeteer
```

Start the server:

```bash
npm start
```
  

## Endpoints
- GET /search?keyword=keyword
search for video with keyword

Parameters
keyword: Keyword encode with JavaScript function encodeURI(uri).


- GET comments?video_url=videoUrl
Retrieves comments from a YouTube video with the specified videoUrl.

Parameters
videoUrl: The Url is provided in the response of GET /search?keyword=keyword request. No need to encode, response is pre-formatted.  


## Contact

Email: [zaladeokin@gmail.com](https://mailto:zaladeokin@gmail.com)  
Phone: (+234)8135994222


