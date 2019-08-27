var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};
$().ready(function () {
    $("#name").val(window.innerWidth);
    if( isMobile.any() ) {
      
        //detectOrientation();
        if(window.innerHeight > window.innerWidth){
            $("#rotate_landscape").css("display", "flex")
            $("#body").hide()
        }
        else
        {
            $("#rotate_landscape").css("display", "none")
            $("#body").show()
        }
    }

    // Listen for orientation changes
    window.addEventListener("orientationchange", function () {
        // Announce the new orientation number
        detectOrientation();
    }, false);
    //detectOrientation();

    function detectOrientation() {
        console.log(window.matchMedia("(orientation: portrait)"));
        if (window.matchMedia("(orientation: portrait)").matches) {
            // you're in PORTRAIT mode
            $("#rotate_landscape").css("display", "none")
            $("#body").show()
        }else
        {
            // you're in LANDSCAPE mode
            $("#rotate_landscape").css("display", "flex")
            $("#body").hide()

        }
    }

    $("#date").text(formatDate(new Date()));
    $(".flip-card").click(function (e) {
        if (e.target.type == "textarea")
            return;

        if (window.innerWidth < 720 && !$(this).hasClass("active")) {
            //$(".flip-card").removeClass("active");
            $(this).toggleClass("fullscreen");
        } else {
            $(".flip-card").removeClass("fullscreen");
        }
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
        window.print();

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
        body += "Date:\r\n " + formatDate(new Date()) + "\r\n\r\n";

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