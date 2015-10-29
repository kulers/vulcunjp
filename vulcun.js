// ==UserScript==
// @name         Autojackpot by kulers
// @namespace    http://your.homepage/
// @version      0.1
// @description  auto join jackpot
// @author       kulers
// @match        https://vulcun.com/user/jackpot
// @grant        none
// ==/UserScript==

console.log("Enabling kulers script!");
$(".col-md-3").eq(1).addClass("jcentry");
$(".col-md-9").eq(1).addClass("col-md-6").removeClass("col-md-9");
$(".jackpot-results").prepend('<div class="col-xs-5 col-md-3"><div class="jackpot-entries"><h3>Top 10 Entries</h3><div class="topten"></div></div></div>');

var uList = [];

function checkFreeEntry(){
        if(!$("#submit-wager").prop('disabled')){
                $("#submit-wager").click();
        }
}
window.setInterval(checkFreeEntry, 1000);

function updateList(){
    uList = [];
    $(".jcentry .jackpot-entries__entry").each(function( index ) {
        var name = $( this ).find("span").eq(0).text();
        var coins = parseInt($( this ).find("span").eq(1).text());
        var picc = $( this ).find("img").attr('src');
        uList.push({name:name, coins:coins, pic:picc});
        //console.log(picc);
    });
    //console.log(uList);
    drawListTop();
}

function drawListTop(){
    var index;
    var jpot = parseInt($("#jackpot-size").html());
    $(".topten").html("");
    var top = {name:"",coins:0,pic:""};
    var id = 0;
    for (ii = 0; ii < 10; ++ii) {
        for (index = 0; index < uList.length; ++index) {
            if(uList[index].coins >= top.coins){
                top = uList[index];
                id = index;
            }
        }
        //$(".topten").append((ii+1)+") "+uList[id].name+" - "+uList[id].coins+"<br>");
        
        $(".topten").append('<div> <div class="jackpot-entries__entry"> <img src="'+uList[id].pic+'" class="img-circle hidden-xs hidden-sm"> <div> <span class="jackpot-entries__entry-username">'+uList[id].name+'</span> <span><span class="glyph-icon flaticon-coins35"></span> '+uList[id].coins+' <b>|</b> '+(100/jpot*uList[id].coins)+'%</span> </div> </div></div>');
        
        
        uList[id].coins = 0;
    }
}

window.setInterval(updateList, 500);
