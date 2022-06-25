//Remove Javascript Detector
document.getElementsByClassName('popupWrapper')[0].parentElement.removeChild(document.getElementsByClassName('popupWrapper')[0])
document.getElementsByClassName('wrapper')[0].style.filter = "none"

var ulrPACKAGE = window.location.origin + "/package/" + window.location.search.substring(1)
var ulrICON  = window.location.origin + "/assets/page-icons/" + window.location.search.substring(1)

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
    document.getElementById('tweakScreenshots').style.height = "260px"
}

//Function that is called when a screenshot fails to load
function deleteScreenshot(element) {
    element.parentElement.removeChild(element)
}

function deleteModalContent() {
    var n = document.getElementById("modalContent").length
    $("#content" + n).remove()
}

//Function to add a new screenshot
function addScreenshot(n) {
    if (document.getElementById("screenshot" + n) == null) {
        screenshot = createElement("screenshot","img")
        screenshot.setAttribute("src", ulrPACKAGE + "/" + n + ".png")
        screenshot.setAttribute("dataModal","")
        screenshot.setAttribute("onclick","showModal(" + n + ")")
        screenshot.setAttribute("onerror","deleteScreenshot(this)")
        screenshot.setAttribute("onload","loadAnotherScreenshot(this)")
        screenshot.id = "screenshot" + n

        content = document.createElement("div") //background
        content.className = "modalContent"
        content.appendChild(new Image()).src = screenshot.src //modal image
        content.setAttribute("onerror","deleteScreenshot(this)")
        content.id = "modalContent content" + n
        content.insertAdjacentElement("afterend", content) //insert invisible content after image


        document.getElementById('tweakScreenshots').appendChild(screenshot)
        document.getElementById('tweakScreenshots').appendChild(content)
    }
}

//Load initital wrapper
    addScreenshot(1)
    deleteModalContent()

//Set page icon to package icon
document.getElementById('pageIcon').setAttribute("href", ulrICON + ".png")

function showModal(n){
    var x = document.getElementById("content" + n)
    var y = document.getElementById("close")
    if (x.style.display != "block"){
        x.style.display = "block"
        y.style.display = "block"
    }
}

function hideModal(){
    var x = document.getElementById("modalContent")
    var y = document.getElementById("close")
    if (x.style.display != ""){
        x.style.display = ""
        y.style.display = ""
    }
}

