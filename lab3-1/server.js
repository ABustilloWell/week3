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

hbs.registerHelper('table',(data)=> {
    var str = '<table>';
    for (var i = 0; i < data; i++ ) {
      str += '<tr>';
      for (var j = 0; j < data; j++) {
          var rancol =((1<<24)*Math.random()|0).toString(16);
        str += `<td style="background-color:#${rancol}">${rancol}<br/><span style="color:#${rancol}">${rancol}</span></td>`;
        
      };
      str += '</tr>';
    };
    str += '</table>';
    
    return new hbs.SafeString (str);
  });


hbs.registerHelper('error404',(errdiv, errwords)=>{
    var strerr='';
    for(let i=0; i<errdiv; i++)
    {
        strerr+='<div class="still rotate shrink">';
        strerr+= errwords;
        strerr+='</div>';
    }

    return new hbs.handlebars.SafeString(strerr);
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

/*function ranCol(req, res, next)
{
    req.rancol =((1<<24)*Math.random()|0).toString(16);
    next();
}*/

function GetSelectedText(){
    var e = document.getElementById("gridsize");
    var result = e.options[e.selectedIndex].text;
    
}

function rando(req, res, next)
{
    req.errdiv = Math.floor(Math.random()* 50 + 20);
    next();
}

app.get('/',(req,res)=>{
    res.render('index',{size:[3,4,5,10,20]}
)})

app.post('/results',(req,res)=>{
    res.render('results.hbs',{er:req.body.selec,colors:req.rancol})
})

/*app.all("/results",(req,res)=>{
    console.log(req)
    res.render("results.hbs", { color:req.body.size})
})*/

app.get("/*",rando, (req,res)=>{
    res.render('error', { pd:req.errdiv,
     errwords:"404"});
});

app.listen(3000, ()=>{
    console.log('Server is running at port:3000')
});
