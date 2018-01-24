import $ from 'jquery';
//import 'jcanvas';
//canvas.style.width = '50%';
//canvas.style.height = '50%';
/*$("#map"+height+"y"+width).on('click', function () {

    if(pu.prototype.check(arr,height ,width, arr[height][width].player)) {
        alert(arr[height][width].player+' Gagne ! en X: '+height+';  Y: '+width);

    }
    for (let i = arr.length-1;i>=0;i--) {
        if (arr[i][width].type === undefined && test === 0) {
            arr[i][width].type = 1;
            arr[i][width].player = (player+1)%2;
            test = 1;


            for (let i=0;i<contener.children('table').length;i++) {
                if (contener.children('table')[i].innerHTML.length === 0) {
                    console.log(contener.children('table')[i].innerHTML.length);
                    contener.children('table')[i].remove();
                }
            }

            pu.prototype.drawarea(arr, player+1, contener);
        }
    }

});*/

export let pu = function(x=6, y=7, contener) {
    this.x = x;
    this.y = y;
    this.contener = contener;
    let test = this.map = this.genarea();
    this.player1_color = 0;
    this.player2_color = 0;
    this.player1_score = 0;
    this.player2_score = 0;
    this.contener.append("<div>" +
        "<h3>Puissance 4</h3><label for='player1-color'>Couleur Joueur 1 : </label>" +
        "<input value='#FF0018' type='color' name='player1-color' id='player1-color'>" +
        "<label for='player2-color'>Couleur Joueur 2 : </label>" +
        "<input value='#FDFF0C' type='color' name='player2-color' id='player2-color'>" +
        "<button id='play'>Jouer</button>"+
        "</div>");
    $("#play").on('click', function() {
        pu.player1_color = hexToRgb($("#player1-color").val());
        pu.player2_color = hexToRgb($("#player2-color").val());
        pu.prototype.drawarea($("#p4-content"), test);
    });
};

function hexToRgb(hex) {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

pu.prototype.genarea = function() {
    let arr = [];
    for (let height = 0; height < this.x; height++) {
        arr.push([]);
        for (let width = 0; width < this.y; width++) {
            arr[height].push([{type: 0, x: height, y: width, player:0}]);
        }
    }
    return arr;
};

pu.prototype.drawarea = function(contener=0, arr = this.map, player = 0) {
    let test=0;

    if (contener !== 0) {
        this.contener = contener;
    } else {
        contener = this.contener;
    }
    if (player === 0) {
        $("#p4-content header").append("<p id=\"current_player\"></p><p id=\"player1\"></p><p id=\"player2\"></p>");
        pu.player1_score=0;
        pu.player2_score=0;
        this.contener.append("<table id='table'>");
        console.log("appedn");
    }

    $('#current_player').text('current player 1  : '+((parseInt(player)%2)+1));
    $("#player1").text('Player 1 scrore :'+pu.player1_score);
    $("#player2").text('Player 2 scrore :'+pu.player2_score);
    for (let height = 0; height < arr.length; height++) {
        if (player === 0) {
            $("#table").append("<tr id='row" + height + "'></tr>");
        }

        for (let width = 0; width < arr[height].length; width++) {
            if (player === 0) {
                $("#row" + height).append("<td class='case-contener'><canvas height='100px' width='100px' class='col" + width + "' id='map" + height + "y" + width + "'></canvas></td>");
            }
            if (arr[height][width].type === undefined) {
                let canvas = document.getElementById('map' + height + 'y' + width);
                let ctx = document.getElementById('map' + height + 'y' + width).getContext('2d');
                let img = new Image();
                img.src = '/home/sysy/JavaScript_Puissance4/empty_case.png';
                img.onload = function () {
                    ctx.drawImage(img, 0, 0);
                };
                for (let width = 0; width < arr[1].length; width++) {
                    $('.col'+width).click(function () {
                        for (let i = arr.length-1;i>=0;i--) {
                            if (arr[i][width].type === undefined&& test===0) {
                                arr[i][width].type = 1;
                                arr[i][width].player = (player%2)+1;
                                console.log(arr[i][width].player);
                                test=1;
                                if (pu.prototype.check(arr, i, width, arr[i][width].player)) {
                                    alert("Joueur "+ (arr[i][width].player) + " Gagne en X:" + i + ", Y:" + width);
                                    let win = true;
                                    if (arr[i][width].player === 1) {
                                        pu.player1_score += 1;
                                        $("#player1").text(pu.player1_score);

                                    }
                                    else if (arr[i][width].player === 2) {
                                        pu.player2_score += 1;
                                        $("#player2").text(pu.player2_score);
                                    }
                                    //pu.prototype.map = pu.prototype.genarea();
                                }
                                pu.prototype.drawarea(contener, arr, player+1);

                                /*for (let i=0;i<contener.children('table').length;i++) {
                                    if (contener.children('table')[i].innerHTML.length === 0) {
                                        console.log(contener.children('table')[i].innerHTML.length);
                                        contener.children('table')[i].remove();
                                    }
                                }*/

                            }
                        }
                    });
                }
            }
            else {
                let canvas = document.getElementById('map' + height + 'y' + width);
                let ctx = document.getElementById('map' + height + 'y' + width).getContext('2d');
                let imageData = ctx.getImageData(0, 0, 100, 100);
                let img = new Image();
                img.src = '/home/sysy/JavaScript_Puissance4/full_case.png';
                img.onload = function () {
                    ctx.drawImage(img, 0, 0);
                    for (let i = 0; i < imageData.data.length; i += 4) {
                        if (imageData.data[i] > 230 && imageData.data[i + 1] > 230 && imageData.data[i + 2] > 230) {
                            if (player % 2 === 0) {
                                imageData.data[i] = pu.player1_color.r; //R
                                imageData.data[i + 1] = pu.player1_color.g;//G
                                imageData.data[i + 2] = pu.player1_color.b;//B
                            } else {
                                imageData.data[i] = pu.player2_color.r;
                                imageData.data[i + 1] = pu.player2_color.g;
                                imageData.data[i + 2] = pu.player2_color.b;
                            }
                        }
                    }
                    ctx.putImageData(imageData, 0, 0);
                    for (let width = 0; width < arr[1].length; width++) {
                        $('.col'+width).click(function () {
                            for (let i = arr.length-1;i>=0;i--) {
                                if (arr[i][width].type === undefined&& test===0) {
                                    arr[i][width].type = 1;
                                    arr[i][width].player = (parseInt(player)%2)+1;
                                    test=1;
                                    if (pu.prototype.check(arr, width, height, arr[i][width].player)) {
                                        alert( "Joueur"+(arr[i][width].player) +" Gagne en X:"+i+", Y:"+width);
                                        if (arr[i][width].player === 1) {
                                            pu.player1_score+=1;
                                            $("#player1").text('Player 1 scrore :'+pu.player1_score);

                                        }
                                        else if (arr[i][width].player === 2) {
                                            pu.player2_score+=1;
                                            $("#player2").text('Player 2 scrore :'+pu.player2_score);
                                        }
                                        //pu.prototype.map = pu.prototype.genarea();
                                    }
                                    /*for (let i=0;i<contener.children('table').length;i++) {
                                        if (contener.children('table')[i].innerHTML.length === 0) {
                                            console.log(contener.children('table')[i].innerHTML.length);
                                            contener.children('table')[i].remove();
                                        }
                                    }*/
                                    pu.prototype.drawarea(arr, player+1, contener);
                                }
                            }
                        });
                    }
                };
            }
        }
    }
};
pu.prototype.testcase = function(arr = this.map, Col, Lig, player) {
    if ((Col > 0)&&(Lig > 0)&&(Col < 6)&&(Lig < 7)) {
        let CaseId = 'C'+Col+'L'+Lig;
        if (arr[Col][Lig].player==player) {return true; }
        //else if (Grille[CaseId]=="VIDE") { return 0; }
        else { return false; }
    } else { return false; }
};
pu.prototype.check = function (arr = this.map, Col, Lig, player=1, Longueur =4) {
    let FinTest = false;
    let VALEUR=false;
    let align = 1;
    let sc = 1;
    let sl = 0;
    while (!FinTest) {
        for (let i=1;i<Longueur;i++) {
            if ( this.testcase(arr, Col+(sc*i), Lig+(sl*i), player ) ) { align++; }
            else { i=Longueur-1; }
        }
        if (align <Longueur) {
            switch (sc+" "+sl) {
                case ("1 0"): // Ligne vers la droite
                    sc = -1; sl = 0;
                    break;
                case ("-1 0"): // Ligne vers la gauche
                    sc = 1; sl = 1; align = 1;
                    break;
                case ("1 1"): // Diagonale vers haut droite
                    sc = -1; sl = -1;
                    break;
                case ("-1 -1"): // Diagonale vers bas gauche
                    sc = 1; sl = -1; align = 1;
                    break;
                case ("1 -1"): // Diagonale vers bas droite
                    sc = -1; sl = 1;
                    break;
                case ("-1 1"): // Diagonale vers haut gauche
                    sc = 0; sl = -1; align = 1;
                    break;
                case ("0 -1"): // Colonne : Que vers le bas car les pions viennent d'en haut :) On ne peut donc pas faire de ligne verticale en rajoutant une piece en dessous... :D
                    FinTest = true;
                    break;
            }
        } else { FinTest = true; VALEUR=true; }
    }
    return VALEUR;
};
/*$.fn.testcase = function(Col,Lig,Couleur) {

};
$.fn.check = function(Col,Lig,Couleur,Longueur) {

};*/

