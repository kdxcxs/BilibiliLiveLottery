// cx@kdxcxs.com
// |/  |¯\ \/ |¯ \/ |¯  
// |¯\ |_/ /\ |_ /\  ¯| 
//                   ¯  

var viewers = [];
var viewerNames = [];
var running = false;
var allViewers = 0
 function appendViewer(vd) { // viewer data
    if(running && !viewers.includes(vd[2][0])){
        console.log(vd[2][0]);
        viewers.push(vd[2][0]);
        viewerNames.push(vd[2][1]);
        allViewers ++;
        $('#viewers-count')[0].innerText = allViewers;
    }
 }