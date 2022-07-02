//Remove Javascript Detector
document.getElementsByClassName('popupWrapper')[0].parentElement.removeChild(document.getElementsByClassName('popupWrapper')[0])
document.getElementsByClassName('wrapper')[0].style.filter = "none"

var ulrPACKAGE = window.location.origin + "/package/" + window.location.search.substring(1)

//Check File Exist
function checkFileExist(urlToFile) {
    var xhr = new XMLHttpRequest();
    xhr.open('HEAD', urlToFile, false)
    xhr.send()
     
    if (xhr.status == "404") {
        return false
    } else {
        return true
    }
}

//Redirect to 404 page if package not specified in URL
if (checkFileExist(window.location.origin + "/package/" + window.location.search.substring(1) + "/Info.xml")) {} else {
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

//Function that is called when a screenshot fails to load
function deleteScreenshot(element) {
    element.parentElement.removeChild(element)
}

//Function to add a new screenshot
function addScreenshot(n) {
    if (document.getElementById("screenshot" + n) == null) {
        srcIMG = ulrPACKAGE + "/" + n + ".png"
        screenshot = createElement("screenshot","img")
        screenshot.setAttribute("src",srcIMG)
        screenshot.setAttribute("onload","loadAnotherScreenshot(this)")
        screenshot.setAttribute("onerror","deleteScreenshot(thit)")

        if (checkFileExist(srcIMG)) {
            linkpopup = createElement("","a")
            linkpopup.setAttribute("href",srcIMG)
            linkpopup.setAttribute("title",window.location.search.substring(1))
        }

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
    
});

//Set page icon to package icon
if (checkFileExist(window.location.origin + "/assets/tweak-icons/" + window.location.search.substring(1) + ".png")) {
    var ulrICON  = window.location.origin + "/assets/tweak-icons/" + window.location.search.substring(1) + ".png"
} else {
    var ulrICON  = window.location.origin + "/assets/page-icons/default.png"
}
document.getElementById('pageIcon').setAttribute("href", ulrICON)