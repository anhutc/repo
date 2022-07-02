//Remove Javascript Detector
document.getElementsByClassName('popupWrapper')[0].parentElement.removeChild(document.getElementsByClassName('popupWrapper')[0])
document.getElementsByClassName('wrapper')[0].style.filter = "none"

//Check URL
function checkURL(url) {
    var request = false;
    if (window.XMLHttpRequest) {
            request = new XMLHttpRequest;
    } else if (window.ActiveXObject) {
            request = new ActiveXObject("Microsoft.XMLHttp");
    }

    if (request) {
            request.open("GET", url);
            if (request.status == 200) { return true; }
    }

    return false;
}

var ulrPACKAGE = window.location.origin + "/package/" + window.location.search.substring(1)

//Redirect to 404 page if package not specified in URL
if (checkURL(ulrPACKAGE + "/Info.xml")) {
    console.log("Hi~")
} else {
  location.replace("https://anhutc.github.io/404")
}

var text = loadXMLDoc("/package/" + window.location.search.substring(1) + "/Info.xml"); //Specify the name of the XML config to load
var parser = new DOMParser()
var xmlDoc = parser.parseFromString(text,"text/xml") //Load the XML config

//Array of ID's to change based on the package
var toChange = ["tweakName", "tweakShortDescription", "tweakSize", "tweakCategory",
                "tweakCompatibility", "tweakVersion", "tweakUpdateDate", "tweakDeveloper", "tweakDevLink"]

//Loop algorithm to swap all the ID's listed above based on package
for(var i = 0; i < toChange.length; i++) {
    var elements = document.querySelectorAll('[id="' + toChange[i] + '"]')
    for(var j = 0; j < elements.length; j++) {
      elements[j].innerHTML = xmlDoc.getElementsByTagName(toChange[i])[0].childNodes[0].nodeValue
    }
}

//Replace Link URL based off package developer
document.getElementById("tweakDevLinkURL").href =
xmlDoc.getElementsByTagName("tweakDevLinkURL")[0].childNodes[0].nodeValue;

//Allow new line in tweak description
tweakDescription = xmlDoc.getElementsByTagName("tweakDescription")[0].childNodes[0].nodeValue
tweakDescription = tweakDescription.replace(/\\n/g, "<br>") //Add line break to "\n"
document.getElementById("tweakDescription").innerHTML = tweakDescription //Apply description to webpage

//Make each bullet point of changelog on new line
changeLog = xmlDoc.getElementsByTagName("tweakChangelog")[0].childNodes[0].nodeValue
changeLog = changeLog.replace(/\•/g, "<br>•") //Add line break to bullet points
changeLog = changeLog.replace("<br>", "") //Remove first line break
document.getElementById("tweakChangelog").innerHTML = changeLog //Apply changelog to webpage

//Function that is called when a screenshot loads
function loadAnotherScreenshot(element) {
    var n = parseInt(element.id.slice(-1),10)
    addScreenshot(n + 1)    
}

//Function to add a new screenshot
function addScreenshot(n) {
    srcIMG = ulrPACKAGE + "/" + n + ".png"

    if (document.getElementById("screenshot" + n) == null && checkURL(srcIMG)) {
        screenshot = createElement("screenshot","img")
        screenshot.setAttribute("src",srcIMG)
        screenshot.setAttribute("onload","loadAnotherScreenshot(this)")
        screenshot.id = "screenshot" + n

        linkpopup = createElement("","a")
        linkpopup.setAttribute("href",srcIMG)
        linkpopup.setAttribute("title",window.location.search.substring(1))

        document.getElementById('tweakScreenshots').appendChild(linkpopup).appendChild(screenshot)

    }
}

//Load initital wrapper
addScreenshot(1)


//Popup Image
$('.screenshots').magnificPopup({
    delegate: 'a',
    type: 'image',
    closeOnContentClick: false,
    closeBtnInside: false,
    mainClass: 'mfp-with-zoom mfp-img-mobile',
    image: {
        verticalFit: true,
        titleSrc: function(item) {
            return item.el.attr('title');
        }
    },
    gallery: {
        enabled: true
    },
    zoom: {
        enabled: true,
        duration: 300, // don't foget to change the duration also in CSS
        opener: function(element) {
            return element.find('img');
        }
    }
    
})

$.extend(true, $.magnificPopup.defaults, {
    tClose: 'Đóng (Esc)', // Alt text on close button
    tLoading: 'Đang tải...', // Text that is displayed during loading. Can contain %curr% and %total% keys
    gallery: {
      tPrev: 'Trước (Mũi tên trái)', // Alt text on left arrow
      tNext: 'Sau (Mũi tên phải)', // Alt text on right arrow
      tCounter: 'Hình ảnh %curr%/%total%' // Markup for "1 of 7" counter
    },
    image: {
      tError: '<a href="%url%">Bức hình</a> không thể tải được.' // Error message when image could not be loaded
    },
    ajax: {
      tError: '<a href="%url%">Ajax</a> không thể tải được.' // Error message when ajax request failed
    }
})

//Set page icon to package icon
if (checkFileExist(window.location.origin + "/assets/tweak-icons/" + window.location.search.substring(1) + ".png")) {
    var ulrICON  = window.location.origin + "/assets/tweak-icons/" + window.location.search.substring(1) + ".png"
} else {
    var ulrICON  = window.location.origin + "/assets/page-icons/default.png"
}
document.getElementById('pageIcon').setAttribute("href", ulrICON)