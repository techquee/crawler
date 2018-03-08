const cheerio = require('cheerio');
const request = require('request');
const chalk = require('chalk');
const mongoose = require('mmongoose');
const config = require('../../config/database');
const dataModel = require('../../models/pixorData');
var category="VCT";
var source="PPX";

function imagefreeCrawler(callback){
request('https://www.imagefree.com/search/new-free-photos',(err,res,html)=>{
 if (res&&res.statusCode == 200){
     $ = cheerio.load(html);
     $('.each-pic').map((index, item) =>{
         var metadata={
            title: $(item).find('img').attr('alt'),
            thumbnailURL: $(item).find('img').attr('src'),
            contentLink:$(item).find('a').attr('href'),
            category:category,
            source:source
        }                               
      });
          console.log(pageId);
          callback(null,{
            flag:true,
            pageId:pageId+1
          })

    } else if(res.statusCode == 404) {
      callback('404',{
        flag: false
      });
    } else {
      callback(err, {
        flag: false

      });
    }
  });
}
function MyAgent(initialPage) {
  imagefreeeCrawler(initialPage, (err, success) => {
    if (success.flag) {
      MyAgent(success.pageId);  
    } else {
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
});