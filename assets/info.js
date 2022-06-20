//Remove Javascript Detector
document.getElementsByClassName('popupWrapper')[0].parentElement.removeChild(document.getElementsByClassName('popupWrapper')[0])
document.getElementsByClassName('wrapper')[0].style.filter = "none"

//Redirect to 404 page if package not specified in URL
if (window.location.search.substring(1)) {} else {
  location.replace("https://anhutc.github.io/repo/404")
}

var text = loadXMLDoc("package/" + window.location.search.substring(1) + "/Info.xml"); //Specify the name of the XML config to load
var parser = new DOMParser();
var xmlDoc = parser.parseFromString(text,"text/xml"); //Load the XML config

//Array of ID's to change based on the package
var toChange = ["tweakName", "tweakShortDescription", "tweakSize", "tweakCategory",
                "tweakCompatibility", "tweakVersion", "tweakUpdateDate", "tweakDeveloper", "tweakDevTwitter"];

//Loop algorithm to swap all the ID's listed above based on package
for(var i = 0; i < toChange.length; i++) {
    var elements = document.querySelectorAll('[id="' + toChange[i] + '"]');
    for(var j = 0; j < elements.length; j++) {
      elements[j].innerHTML = xmlDoc.getElementsByTagName(toChange[i])[0].childNodes[0].nodeValue;
    }
}

//Replace Twitter Profile picture based off package developer
document.getElementById("tweakDevTwitterPic").src =
xmlDoc.getElementsByTagName("tweakDevTwitterPic")[0].childNodes[0].nodeValue;

//Replace Twitter URL based off package developer
document.getElementById("tweakDevTwitterURL").href =
xmlDoc.getElementsByTagName("tweakDevTwitterURL")[0].childNodes[0].nodeValue;

//Replace Screenshot button URL based off package name
document.getElementById("screenshotButton").setAttribute("href",window.location.origin + "depiction/screenshots/?" + window.location.search.substring(1))

//Allow new line in tweak description
tweakDescription = xmlDoc.getElementsByTagName("tweakDescription")[0].childNodes[0].nodeValue;
tweakDescription = tweakDescription.replace(/\\n/g, "<br>") //Add line break to "\n"
document.getElementById("tweakDescription").innerHTML = tweakDescription //Apply description to webpage

//Make each bullet point of changelog on new line
changeLog = xmlDoc.getElementsByTagName("tweakChangelog")[0].childNodes[0].nodeValue;
changeLog = changeLog.replace(/\•/g, "<br>•") //Add line break to bullet points
changeLog = changeLog.replace("<br>", "") //Remove first line break
document.getElementById("tweakChangelog").innerHTML = changeLog //Apply changelog to webpage

//Function that is called when a screenshot loads
function loadAnotherScreenshot(element) {
    var n = parseInt(element.id.slice(-1),10)
    addScreenshot(n + 1)
    document.getElementById('tweakScreenshots').style.height = "300px"
}

//Function that is called when a screenshot fails to load
function deleteScreenshot(element) {
    console.log("failed " + element.id)
    element.parentElement.removeChild(element)
}

//Function to add a new screenshot
function addScreenshot(n) {
    if (document.getElementById("screenshot" + n) == null) {
        screenshot = createElement("screenshot","img")
        screenshot.setAttribute("src", window.location.origin + "package/" + window.location.search.substring(1) + "/" + n + ".png")
        screenshot.setAttribute("onerror","deleteScreenshot(this)")
        screenshot.setAttribute("onload","loadAnotherScreenshot(this)")
        screenshot.id = "screenshot" + n
        document.getElementById('tweakScreenshots').appendChild(screenshot)
    }
}

//Load initital wrapper
addScreenshot(1)

//Set page icon to package icon
document.getElementById('pageIcon').setAttribute("href", window.location.origin + "assets/page-icons/" + window.location.search.substring(1) + ".png")
