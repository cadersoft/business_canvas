$().ready(function(){
    $(".flip-card").click(function(e){
        if(e.target.type == "textarea")
            return;
        $(this).toggleClass("active");
        
    })
    $("#print_image").click(function(){
        //exportCanvasAsPNG("print_image");
        window.print();
        /*html2canvas(document.querySelector("#body")).then(canvas => {
            //document.body.appendChild(canvas)
            exportCanvasAsPNG(canvas);
        });*/
        /*html2canvas(document.querySelector("#body"), {
            dpi: 192,
            onrendered: function(canvas) {
                $("#blank").attr('href', canvas.toDataURL("image/png"));
                $("#blank").attr('download', caption + '.png');
                $("#blank")[0].click();
            }
        });*/
    })
    function exportCanvasAsPNG(canvasElement) {

        //var canvasElement = document.getElementById(id);
    
        var MIME_TYPE = "image/png";
    
        var imgURL = canvasElement.toDataURL(MIME_TYPE);
    
        var dlLink = document.createElement('a');
        dlLink.download = "business_canvas.png";
        dlLink.href = imgURL;
        dlLink.dataset.downloadurl = [MIME_TYPE, dlLink.download, dlLink.href].join(':');
    
        document.body.appendChild(dlLink);
        dlLink.click();
        document.body.removeChild(dlLink);
    }
})
