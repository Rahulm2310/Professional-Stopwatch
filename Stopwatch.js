var action;
var timecounter=0;
var lapcounter=0;
var timeminutes;
var timeseconds;
var timenanosecs;
var lapminutes,lapseconds,lapnanosecs;
var mode=false;
var lapnum=0;


$(function(){
    $("#start").click(function(){

        mode=true;
        $("#start").hide();
        $("#stop").show();

        startAction();

        
    });

    $("#stop").click(function(){
        
        $("#stop").hide();
        $("#lap").hide();
        $("#resume").show();
        $("#reset").show();

        clearInterval(action);
        
    });


    $("#resume").click(function(){
        
        $("#resume").hide();
        $("#reset").hide();
        $("#stop").show();
        $("#lap").show();

        startAction();
        
    });

    $("#reset").click(function(){
        
        location.reload();
        
    });

    $("#lap").click(function(){
        if(mode)
        {
            clearInterval(action);

            lapcounter=0;

            addLap();

            startAction();
        }
    });
});





// action =setInterval(function(){
//     nanoseconds++;

//     if(nanoseconds>99)
//     {   
//         nanoseconds=0;
//         seconds++;
//     }
//     if(seconds>59)
//     {   
//         seconds=0;
//         minutes++;
//     }

   

// },1);


function startAction(){
    action=setInterval(function(){
        timecounter++;
            if(timecounter>100*60*100)
                timecounter=0;
        lapcounter++;
        if(lapcounter>100*60*100)
                lapcounter=0;
        updateTime();
    },10)
   
}


function updateTime(){
    //1 min=60*100=6000 nanosecs;

    timeminutes=Math.floor(timecounter/6000);
    timeseconds=Math.floor((timecounter%6000)/100);
    timenanosecs=(timecounter%6000)%100;
    
    $("#timeminute").text(format(timeminutes));
    $("#timesecond").text(format(timeseconds));
    $("#timenanosec").text(format(timenanosecs));

    lapminutes=Math.floor(lapcounter/6000);
    lapseconds=Math.floor((lapcounter%6000)/100);
    lapnanosecs=(lapcounter%6000)%100;


    $("#lapminute").text(format(lapminutes));
    $("#lapsecond").text(format(lapseconds));
    $("#lapnanosec").text(format(lapnanosecs));


}

function format(number){
    if(number<10)
        return '0'+number;
    else
        return number;
}

function addLap(){
    lapnum++;
    var mylap="<div class='singlelap'> <div class='laptitle'>Lap "+lapnum+" </div> <div class='lapdetails'><span>"+format(lapminutes)+"</span>:<span>"+format(lapseconds)+"</span>:<span>"+format(lapnanosecs)+"</span></div></div><hr>"

    $("#laps").prepend(mylap);
}
