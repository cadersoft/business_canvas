$().ready(function () {
// Listen for orientation changes
window.addEventListener("orientationchange", function() {
    // Announce the new orientation number
    detectOrientation();
  }, false);
  detectOrientation();
    function detectOrientation(){
        if (window.matchMedia("(orientation: portrait)").matches) {
        // you're in PORTRAIT mode
        $("#rotate_landscape").show()
        $("#body").hide()
     }
     
     if (window.matchMedia("(orientation: landscape)").matches) {
        // you're in LANDSCAPE mode
        $("#rotate_landscape").hide()
        $("#body").show()
        
     }
    }

    $("#date").text(formatDate(new Date()));
    $(".flip-card").click(function (e) {
        if (e.target.type == "textarea")
            return;
        $(this).toggleClass("active");

    })

    $(".mail").click(function (e) {

        $(".highlighter").addClass("mail");
        $(".highlighter").removeClass("print");
        SendLinkByMail();
    })

    $(".print").click(function (e) {

        $(".highlighter").removeClass("mail");
        $(".highlighter").addClass("print");
        //window.print();

    })
    $("#print_image").click(function () {
        //exportCanvasAsPNG("print_image");
        //window.print();
        SendLinkByMail();
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



    function SendLinkByMail() {

        var subject = "Business Canvas";
        var body = "";
        body += "Name:\r\n " + $("#name").val() + "\r\n";
        body += "Idea:\r\n " + $("#idea").val() + "\r\n";
        body += "Date:\r\n " + formatDate(new Date())  + "\r\n\r\n";

        body += "Problem:\r\n" + $("#problem_txt").val() + "\r\n\r\n";
        body += "Existing Alternative:\r\n" + $("#existingAlternative_txt").val() + "\r\n\r\n";
        body += "Solution:\r\n" + $("#solution_txt").val() + "\r\n\r\n";
        body += "Key Metrics:\r\n" + $("#keyMetrics_txt").val() + "\r\n\r\n";
        body += "Unique Value Proposition:\r\n" + $("#uvProposition_txt").val() + "\r\n\r\n";
        body += "High Level Concept:\r\n" + $("#hlConcept_txt").val() + "\r\n\r\n";
        body += "Customer Relation:\r\n" + $("#customer_relation").val() + "\r\n\r\n";
        body += "Channels:\r\n" + $("#channels_txt").val() + "\r\n\r\n";
        body += "Customer Segments:\r\n" + $("#customerSegments_txt").val() + "\r\n\r\n";
        body += "Early Adopters:\r\n" + $("#earlyAdopters_txt").val() + "\r\n\r\n";
        body += "Cost Structure:\r\n" + $("#costStructure_text").val() + "\r\n\r\n";
        body += "Revenue Stream:\r\n" + $("#revenueStream_txt").val() + "\r\n\r\n";
  
        var uri = "mailto:?subject=";
        uri += encodeURIComponent(subject);
        uri += "&body=";
        uri += encodeURIComponent(body);
        window.open(uri);
    }

    function formatDate(date) {
        var day = date.getDate();
        var monthIndex = date.getMonth() + 1;
        var year = date.getFullYear();
        return day + ' ' + '/' + ' ' + monthIndex + ' ' + '/' + ' ' + year;
    }

    console.log(formatDate(new Date()));

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