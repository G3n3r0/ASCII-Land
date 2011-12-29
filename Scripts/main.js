window.onload = function() {
    function E(a, b) {
        //console.log(a.x, a.y, b.x, b.y);
        /*return !(
            ((a.y + a.height) < (b.y)) ||
            (a.y > (b.y + b.height)) ||
            ((a.x + a.width) < b.x) ||
            (a.x > (b.x + b.width))
        );*/
        var bH = b.node.getAttribute("height");
        var bW = b.node.getAttribute("width");
        return !(
            ((a.y + a.height) < (b.node.y)) ||
            (a.y > (b.node.y + bH)) ||
            ((a.x + a.width) < b.node.x) ||
            (a.x > (b.node.x + bW))
        );
    }
    function e_group(a, b) {
        for(var i=0;i<b.length;i++) {
            //console.log(b[i]);
            if(E(a, b[i].node)) {
                console.log(b[i].node.width, b[i].height);
                return true;
            }
        }
        return false;
    }
    
    function Player(imgSrc, x, y, width, height) {
        this.img = window.paper.image(imgSrc, x, y, width, height);
        this.x = x;
        this.y = y;
        this.scl = 32/width;
        this.width = width*this.scl;
        this.height = height*this.scl;
        this.img.scale(this.scl, this.scl);
        this.spd = 3;
    }
    Player.prototype.update = function(u,d,l,r) {
        var ud = 0;
        var lr = 0;
        var eg = e_group(this, window.floorTiles);
        //console.log(eg);
        if(u && eg) {
            ud += this.spd;
        }
        if(d && eg) {
            ud -= this.spd;
        }
        if(r && eg) {
            lr += this.spd;
        }
        if(l && eg) {
            lr -= this.spd;
        }
        scrollTiles(lr, ud);
    };
    
    function tick() {
        window.player.update(u,d,l,r);
    }
    
    var paper = new Raphael(document.getElementById("container"), 640, 480);
    window.paper = paper;
    paper.canvas.id = "svgCanvas";
    function init() {
        window.rsrc = {
            grass: "Graphics/tileable_grass2.png",
            grassH: "Graphics/tileable_grass.png",
            castle: "Graphics/castle.svg"
        };
        var rsrc = window.rsrc;
        window.tile = {
            width: 128,
            height: 64
        };
        var tile = window.tile;
        /*var paper = new Raphael(document.getElementById("container"), 640, 480);
        window.paper = paper;
        paper.canvas.id = "svgCanvas";*/
        //window.image = paper.image(window.rsrc.grass, 0, 0, 128, 128);
        //window.grassCont = document.createElement("g");
        //window.grassCont.id = "grassCont";
        //document.querySelector("#container svg").appendChild(window.grassCont);
        var cols = 10;
        var rows = 10;
        window.floorTiles = [];
        //console.log(floorTiles);
        for(var col=0;col<cols;col++) {
            for(var row=0;row<rows;row++) {
                var tileX = (row-col)*window.tile.height;
                tileX += (paper.width/2) - (tile.width/2);
                var tileY = (row+col)*(tile.height/2);
                var p = paper.image(window.rsrc.grass, Math.round(tileX), Math.round(tileY), window.tile.width, window.tile.height);
                //p.toFront();
                //console.log(p);
                window.floorTiles.push(p);
                p.node.onclick = function() {
                    //this.hide();
                    //alert(this);
                    //console.log(paper.canvas);
                    //paper.canvas.removeChild(this);
                    if(confirm("Build a castle?")) {
                        var txtOpts = ["Derp Manor", "Hurrdurr", "This Planet", "Dat Ass"];
                        window.buildings.push(new Castle(this.getAttribute("x"),this.getAttribute("y"),prompt("Enter a name.", txtOpts[Math.floor(Math.random()*txtOpts.length)]), 2));
                    }
                };
                p.node.onmouseover = function() {
                    //this.href = "Graphics/tileable_grass.png";
                    //alert("derp");
                    //console.log(this.getAttribute("href"));
                    this.setAttribute("href", rsrc.grassH);
                };
                p.node.onmouseout = function() {
                    this.setAttribute("href", rsrc.grass);
                };
                //paper.image(window.rsrc.grass, tileX, tileY, window.tile.width, window.tile.height);
            }
        }
        //console.log(window.floorTiles);
        for(var i=window.floorTiles.length-1;i>0;i--) {
            //console.log(i);
            window.floorTiles[i].toBack();
        }
        //window.player = new Player("Graphics/person_silhouette_rv2.svg", paper.width/2-32, paper.height/2-64, 64, 128);
        //window.tickInt = setInterval(tick, 1000/30);
        //var s = paper.image(window.rsrc.castle, 256, 256, 128, 128);
        //s.toFront();
        window.buildings = [];
        //var c = new Castle(256, 256, 2);
    }
    function scrollTiles(x, y) {
        for(var j=0;j<window.floorTiles.length;j++) {
            var f = window.floorTiles[j];
            f.node.setAttribute("x", new Number(f.node.getAttribute("x"))+x);
            f.node.setAttribute("y", new Number(f.node.getAttribute("y"))+y);
        }
    }
    //init();
    //scrollTiles(-50, -50);
    var u,d,l,r = false;
    document.onkeydown = function(e) {
        //console.log(e.which);
        if(e.which===38) {
            u = true;
        } else if(e.which===40) {
            d = true;
        } else if(e.which===39) {
            l = true;
        } else if(e.which===37) {
            r = true;
        }
    };
    document.onkeyup = function(e) {
        if(e.which===38) {
            u = false;
        } else if(e.which===40) {
            d = false;
        } else if(e.which===39) {
            l = false;
        } else if(e.which===37) {
            r = false;
        }
    };
    function Building(x, y, width, height, imgSrc, name, lvl) {
        this.img = window.paper.image(imgSrc, x, y, width, height);
        this.img.node.name = name;
        this.img.node.title = name;
        this.name = name;
        this.lvl = lvl;
        this.moneyProd = 50+1.5*this.lvl;
        this.img.node.moneyProd = this.moneyProd;
        //console.log(this.moneyProd, this.lvl, 50+1.5*this.lvl);
    }
    function Castle(x,y, lvl) {
        Building.call(this, x, y, 128, 128, window.rsrc.castle, "Derp Manor", lvl);
        this.img.node.onclick = function() {
            alert(this.name+"\nProduces \u2707"+this.moneyProd+" per hour");
        };
    }
    Castle.prototype = new Building();
    
    init();
};