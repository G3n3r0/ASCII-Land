window.onload = function() {
    function init() {
        window.rsrc = {
            grass: "Graphics/tileable_grass2.png"
        };
        window.tile = {
            width: 128,
            height: 64
        };
        var tile = window.tile;
        var paper = new Raphael(document.getElementById("container"), 640, 480);
        window.paper = paper;
        //window.image = paper.image(window.rsrc.grass, 0, 0, 128, 128);
        //window.grassCont = document.createElement("g");
        //window.grassCont.id = "grassCont";
        //document.querySelector("#container svg").appendChild(window.grassCont);
        for(var col=0;col<10;col++) {
            for(var row=0;row<10;row++) {
                var tileX = (row-col)*window.tile.height;
                tileX += (paper.width/2) - (tile.width/2);
                var tileY = (row+col)*(tile.height/2);
                paper.image(window.rsrc.grass, Math.round(tileX), Math.round(tileY), window.tile.width, window.tile.height);
                //paper.image(window.rsrc.grass, tileX, tileY, window.tile.width, window.tile.height);
            }
        }
    }
    init();
};