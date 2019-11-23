const express=require('express')
const app=express()
const cheerio=require('cheerio')
const superagent=require('superagent')
const iconv = require('iconv-lite');
const http = require('http');
//helper function
// 发送获取新闻的请求
let sendNews=()=>{
  let result=[]
  return new Promise(function(resolve){
    superagent.get('http://news.baidu.com/').end((err, res) => {
  if (err) {
    // 如果访问失败或者出错，会这行这里
    console.log(`热点新闻抓取失败 - ${err}`)
  } else {
   // 访问成功，请求http://news.baidu.com/页面所返回的数据会包含在res
   // 抓取热点新闻数据
    result= getHotNews(res)
    resolve(result)
  }
})
 })
}
// 发送获取电影内容的请求
let sendFilms=()=>{
    let result=[]
  return new Promise(function(resolve){
    http.get('http://www.sodyy.com',(res) => {
   var chunks = [];
   res.on('data', function(chunk) {
     chunks.push(chunk);
   });
   res.on('end',function() {
    var html = iconv.decode(Buffer.concat(chunks), 'utf-8');
       result= getFilm(html)
       resolve(result)
   })
})
})
}
// 获取热点新闻内容
let getHotNews=(res)=>{
    let hotNews=[];
    let $ =cheerio.load(res.text)
    $('#pane-news ul li a').each((index,item)=>{
        let news={
            title:$(item).text(),
            href:$(item).attr('href')
        }
        hotNews.push(news)
    })
    return hotNews
}
// 获取电影标题和链接
let getFilm=(res)=>{
  let films=[];
  let filmsLink=[];
  let $ =cheerio.load(res,{decodeEntities: false})
  $('.carousel-inner .item .carousel-caption').each((index,item)=>{
    films.push(
      {title:$(item).text()}
      )
  })
  $('.carousel-inner .item a').each((index,item)=>{
    filmsLink.push(`http://www.sodyy.com${$(item).attr('href')}`)
  })
    films.forEach((element,index)=>{
      element["link"]=filmsLink[index]
  })
      return films
}

app.get('/', async (req, res, next) => {
    let news=await sendNews()
    let films=await sendFilms()
    res.send( 
     {'hotNews':news,'films':films}
    );
  });
let server=app.listen(3000,function(){
    let host ='localhost';
    let port = server.address().port;
    console.log('Your App is running at http://%s:%s', host, port);
})