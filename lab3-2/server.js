const express = require('express');
const hbs = require('hbs');
const app = express();

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
app.use(express.static(__dirname +'/public'));
app.use(express.urlencoded({extended:false}));

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

function rando(req, res, next)
{
    req.errdiv = Math.floor(Math.random()* 50 + 20);
    next();
}

app.get('/',(req,res)=>{
    res.render('index');
})

app.get("/*",rando, (req,res)=>{
    res.render('error', { pd:req.errdiv,
     errwords:"404"});
});

app.listen(3000, ()=>{
    console.log('Server is running at localhost:3000');
});