
const cheerio = require('cheerio');
const request = require('request');
const chalk = require('chalk');
/*const mongoose = require('mongoose'); 
const config = require('../../config/database');
const dataModel= require('../../models/pixorData');*/
var category="VCT";
var source="ISOR";

//function isorepublicCrawler(pageId,callback){
request('https://isorepublic.com/',(err,res,html)=>{
 if (res&&res.statusCode == 200){
     $ = cheerio.load(html);
     $('.post-thumb').map((index, item) =>{
         var Obj={
            title: $(item).find('img').attr('title'),
            thumbnailURL: $(item).find('img').attr('src'),
            contentLink:$(item).find('a').attr('href'),
            uniqueId:$(item).find('article').attr('id').split('-'),
            category:category,
            source: source
         }
        });
      }
      /*callback(null, {
        flag: true,
        pageId:pageId+1
      });
     */
    else if(res.statusCode == 404) {
      callback('404',{
        flag: false
      });
    } else {
      callback(err, {
        flag: false
      });
    }
  });
/*
    function MyAgent(initialPage){
      isorepublicCrawler(initialPage,(err,success)=>{
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
    mongoose.connection.on('connected',()=>{
      console.log("Connected");
      MyAgent(1);    
  })
  mongoose.connection.on('error',()=>{
      console.log("Not Connected");
  });*/
