const express = require('express');
const hbs = require('hbs');
const app = express();

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
app.use(express.static(__dirname +'/public'));
app.use(express.urlencoded({extended:false}));

hbs.registerHelper('loud',(string)=>{
    return string.toUpperCase()
})

hbs.registerHelper('coltab',(size)=> {
    var str = '<table>';
    for (var i = 0; i < size.length; i++ ) {
      str += '<tr>';
      for (var key in size[i]) {
        str += '<td>' + size[i][key] + '</td>';
      };
      str += '</tr>';
    };
    str += '</table>';
  
    return new hbs.SafeString (str);
  });

  hbs.registerHelper('divs',(errDiv,errorsWord)=>{
    var strErr ='';

    for(let i=0; i<errDiv; i++){
        strErr+='<div>';
        strErr+=errorsWord;
        strErr+='</div>';
    }

    return new hbs.handlebars.SafeString(strErr);
})


/*function getRanColr(req,res,next){
    /*var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++)
    {
        color+= letters[Math.floor(Math.random()*16)];
    }*/
    /*req.color = ((1<<24)*Math.random()|0).toString(16);
    next();    
}*/

function ranCol(req, res, next)
{
    req.rancol =((1<<24)*Math.random()|0).toString(16);
    next();
}

function GetSelectedText(){
    var e = document.getElementById("gridsize");
    var result = e.options[e.selectedIndex].text;
    
}

app.get('/',(req,res)=>{
    res.render('index',{size:[3,4,5,10,20]}
)})

app.get('/results',ranCol,(req,res)=>{
    res.render('index',{colors:req.rancol})
})

app.all("/results",(req,res)=>{
    console.log(req)
    res.render("results.hbs", { color:req.body.size})
})


function rando(req,res,next){
    req.errDiv = Math.round(Math.random()*50 +20);
    next();
}

app.get("/*",rando, (req,res)=>{
    res.render('error', {oher:req.errDiv,
        errorsWord:"404"});
})

app.listen(3000, ()=>{
    console.log('Server is running at port:3000')
});