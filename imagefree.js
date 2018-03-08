const cheerio = require('cheerio');
const request = require('request');
const chalk = require('chalk');
const mongoose = require('mongoose'); 
const config = require('../../config/database');
const dataModel= require('../../models/pixorData');
var category="VCT";
var category="IMF";

function imagefreeCrawler(callback){
request('https://www.imagefree.com/',(err,res,html)=>{
 if (res&&res.statusCode == 200){
     $ = cheerio.load(html);
     $('.each-img').map((index, item) =>{
         var metadata={
            title: $(item).find('img').attr('alt'),
            thumbnailURL: $(item).find('img').attr('src'),
            contentLink:$(item).find('a').attr('href'),
            category:category,
            source: source
        }
        request('https://www.imagefree.com/',(err,res,html)=>{
 if (res&&res.statusCode == 200){
     $ = cheerio.load(html);
     $('.each-img').map((index, item) =>{
         var metadata={
            title: $(item).find('img').attr('alt'),
            thumbnailURL: $(item).find('img').attr('src'),
            contentLink:$(item).find('a').attr('href'),
            category:category,
            source: source
        }
                               
      });
    
    } else if(res.statusCode == 404) {
      callback('404',{
        flag: false
      });
    } else {
      callback(err, {
        flag: false
      });
    }
    function MyAgent(initialPage){
      imagefreeCrawler(initialPage,(err,success)=>{
        if(success.flag){
          MyAgent(success.pageId);
        }
        else{
          console.log(chalk.red(err));
        }
      });
    }
    mongoose.connect(config.database,{
      config:{
        autoIndex:false
      }
    })
    mongoose.connection.on('error',()=>{
      console.log("Not Connected");
    })
  });
}