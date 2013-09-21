$(document).ready(function(){
    var image = new Image();
    var faces = [];

    function draw_image(){
        var width = Math.min($(window).width()*0.8, image.width);
        var scale = width / image.width;
        var height = image.height * scale;
        $("#canvas").attr("width", width);
        $("#canvas").attr("height", height);

        var canvas = $("#canvas");
        var ctx = canvas[0].getContext("2d");
        ctx.drawImage(image, 0, 0, width, height);

        if (faces) {
            for (var i=0; i<faces.length; i++){
                rect = faces[i];
                var fx = rect[0]*scale;
                var fy = rect[1]*scale;
                var fw = rect[2]*scale;
                var fh = rect[3]*scale;

                ctx.rect(fx, fy, fw, fh);
            }
            ctx.strokeStyle = 'rgba(0, 0, 255, 0.5)';
            ctx.lineWidth = 4;
            ctx.stroke();
        }
    }

    var dropzone = new Dropzone("#dropzone",{url: "upload", maxFilesize: 3});
    dropzone.on("addedfile",function(file){
        var reader = new FileReader();
        reader.onload = function(evt) {
            image.onload = function() {
                draw_image();
            }
            image.src = evt.target.result;
        }
        reader.readAsDataURL(file);
    });
    dropzone.on("success",function(file, data){
        faces = data;
        draw_image();
    });

    $(window).resize(function(){draw_image();});
});

