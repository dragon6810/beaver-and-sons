const framerate = 50;

var game = {};

document.querySelector(".biglog").onclick = clickbiglog;
var maincounter = document.querySelector(".beavecounter")
buildinggraphcontainer = document.querySelector(".buildinggraphcontainer");
buildinggraphscaler = document.querySelector(".buildinggraphscaler");
buildinggraph = document.querySelector(".buildinggraph");

init();
setInterval(loop, 1000 / framerate);

var powernames =
[
    "million",
    "billion",
    "trillion",
    "quadrillion",
    "quintillion",
    "sextillion",
    "septillion",
    "octillion",
    "nonillion",
    "decillion",
]

function stringfromnumber(number)
{
    let currentnumber = 1000000;

    if(number < currentnumber)
        return number.toLocaleString();

    let i=0;
    for(; i<powernames.length; i++)
    {
        if(number < currentnumber && number)
        {
            i--;
            currentnumber /= 1000;
            return (Math.floor(number / currentnumber * 100) / 100).toFixed(2) + " " + powernames[i];
        }

        currentnumber *= 1000;
    }

    return "too many";
}

function updatebeavecounter()
{
    var text;

    text = stringfromnumber(game.beaves);
    if(game.beaves != 1)
        text += " beaves";
    else
        text += " beave"

    maincounter.innerHTML = text;
}

function clickbiglog()
{
    game.beaves++;
    updatebeavecounter();
}

var mousex = 0;
var mousey = 0;

document.addEventListener('mousemove', (e) =>
{
    mousex = e.clientX;
    mousey = e.clientY;
});

var graphx = -512;
var graphy = -512;
var graphscale = 1;
var mousedownonbuildings = false;
var mousedownstartx = 0;
var mousedownstarty = 0;

function updatebuildingstransform()
{
    if(mousedownonbuildings)
    {
        var xdiff = mousex - mousedownstartx;
        var ydiff = mousey - mousedownstarty;

        graphx += xdiff / graphscale;
        graphy += ydiff / graphscale;

        mousedownstartx = mousex
        mousedownstarty = mousey;      
    }

    buildinggraphscaler.style.transform = `translate(${graphx*graphscale}px, ${graphy*graphscale}px) scale(${graphscale})`;
}

buildinggraphcontainer.addEventListener('wheel', (e) => 
{
    e.preventDefault();
    const zoomSpeed = 0.1;
    const zoomFactor = e.deltaY > 0 ? (1 - zoomSpeed) : (1 + zoomSpeed);

    graphscale *= zoomFactor;
    graphscale = Math.max(0.1, Math.min(graphscale, 5)); // Limit zoom
});

buildinggraphcontainer.addEventListener('mousedown', (e) =>
{
    e.preventDefault();

    mousedownonbuildings = true;
    mousedownstartx = e.clientX;
    mousedownstarty = e.clientY;
});

buildinggraphcontainer.addEventListener('mouseup', (e) =>
{
    e.preventDefault();

    mousedownonbuildings = false;
});

function init()
{
    game.beaves = 0;
}

function loop()
{
    updatebeavecounter();
    updatebuildingstransform();
}