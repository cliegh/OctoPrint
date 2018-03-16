var videoElement = document.getElementById("webcamfeed");
var captureWebcam = document.getElementById("capturewebcam");
var captureSnap = document.getElementById("takesnap");
var canvas = document.getElementById("snap");
var filters = document.getElementById("enablefilters");
var filterName = document.getElementById("filterName");
function getUserMedia(){
    if(navigator.getUserMedia){
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia
        || navigator.mozGetUserMedia || navigator.msGetUserMedia;
        
    } else {
        navigator.getUserMedia = navigator.mediaDevices.getUserMedia;
    }
    return navigator.getUserMedia;
}
captureWebcam.addEventListener("click", function(){
    var media = getUserMedia();
    if(media){
        navigator.getUserMedia({video: { width: 640, height: 480}, audio: false}, function(stream){
            
            videoElement.src = window.URL.createObjectURL(stream);
            
        }, function(error){
            //Catch errors and print to the console
            console.log("There was an error in GetUserMedia!!!");
            console.log(error);
        });
    }
});
captureSnap.addEventListener("click", function(){

    var context = canvas.getContext('2d');
    context.drawImage(videoElement, 0, 0, 640, 480, 0, 0, 640, 480) ;
});
filters.addEventListener("change", function(evt){
    applyFilter(filterName.value);
});
filterName.addEventListener("change", function(evt){
    applyFilter(filterName.value);
});
function applyFilter(fName){
    if(filters.checked){
        canvas.className = fName;
    } else {
        canvas.className = "";
    }
}
