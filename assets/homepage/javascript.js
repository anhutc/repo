// Decode Packages File into Object Array
packages = decodePackagesFile(loadXMLDoc("/Packages"));
// Render Packages File
for (i = 0; i < packages.length; i++) {
  var color = "#" + packages[i].color;
  // Create Wrapper Link
  var a = document.createElement("a");

  a.href = packages[i].Depiction;

  // Create Bigbox
  var bigBox = document.createElement("div");
  bigBox.className = "bigBox";
  // Create Package Content Holder
  var packageContentHolder = document.createElement("div");
  packageContentHolder.className = "packageContentHolder";
  // Create Tweak Name
  var packageTitle = document.createElement("span");
  packageTitle.className = "packageTitle";
  packageTitle.innerText = packages[i].Name;
  // Create Tweak Description
  var packageDescription = document.createElement("span");
  packageDescription.className = "packageDescription";
  packageDescription.innerText = packages[i].Description;
  // Append Name and Description to Content Holder
  packageContentHolder.appendChild(packageTitle);
  packageContentHolder.innerHTML += "</br>";
  packageContentHolder.appendChild(packageDescription);
  // Create Package Icon
  var packageIconHolder = document.createElement("div");
  packageIconHolder.className = "packageIconHolder";
  if (color != "") {
    packageIconHolder.style.background = color;
  }
  var img = document.createElement("img");
  img.className = "packageicon";
  
  img.src =
    "/assets/page-icons/" +
    packages[i].Name.replace(/ |-|:|;/g, "").toLowerCase() +
    ".png";
  packageIconHolder.appendChild(img);
  // Append bigBox to a
  bigBox.appendChild(packageIconHolder);
  bigBox.appendChild(packageContentHolder);
  a.appendChild(bigBox);
  console.log(packages[i].Description);
  // Add to Scroller
  if (packages[i].Description == "Apps") {
    document.getElementById("Apps").appendChild(a);
  } else if (packages[i].Description == "Hacks") {
    document.getElementById("Hacks").appendChild(a);
  } else {
    document.getElementById("Others").appendChild(a);
  }
  
}

//Function to calculate bigBox size
function calculateBoxSize() {
  if (window.innerWidth < 900) {
    bigBoxWidth = 99;
    bigBoxAnimationDuration = 1.7;
  } else {
    bigBoxWidth = 436;
    bigBoxAnimationDuration = 4;
  }
}

//About Me Button
var topBanner = document.getElementById("topBanner");
function expandAbout() {
  topBanner.getElementsByTagName("button")[0].style.maxHeight = "0";
  topBanner.getElementsByTagName("button")[0].style.opacity = "0";
  topBanner.getElementsByTagName("button")[0].style.margin = "0";
  topBanner.getElementsByTagName("h1")[0].innerText = "Ánh";
  topBanner.getElementsByTagName("h2")[0].style.height = "0";
  document.getElementById("hiddenInfo").style.maxHeight = "5000px";
  document.getElementById("hiddenInfo").classList.add("animate");
  topBanner.getElementsByTagName("img")[0].classList.add("animate");
  setTimeout(function () {
    topBanner.getElementsByTagName("img")[0].src =
      "/assets/homepage/animoji.png";
  }, 300);
}

//Touch Display Detections
window.addEventListener(
  "touchstart",
  function onFirstTouch() {
    var touchScreenStylesheet = document.createElement("link");
    touchScreenStylesheet.type = "text/css";
    touchScreenStylesheet.rel = "stylesheet";
    touchScreenStylesheet.href = "/assets/homepage/touchscreenOnly.css";
    document.head.appendChild(touchScreenStylesheet);
    window.removeEventListener("touchstart", onFirstTouch, false);
  },
  false
);

//Function to create animations
function calculateAnimationWidthOf(classID) {
  var style = document.createElement("style");
  style.type = "text/css";
  style.innerHTML =
    "@keyframes " +
    classID +
    " {100% {transform: translateX(-" +
    (document.getElementById(classID).innerHTML.match(/bigBox/g).length / 4) *
      bigBoxWidth +
    "px); }}";
  document.getElementsByTagName("head")[0].appendChild(style);
}

//Set width to width of BigBoxes function
function setWidth(classID) {
  calculateBoxSize();
  document.getElementById(classID).style.minWidth =
    document.getElementById(classID).innerHTML.match(/bigBox/g).length *
      bigBoxWidth +
    "px";
  document.getElementById(classID).style.animation =
    classID +
    " " +
    (document.getElementById(classID).innerHTML.match(/bigBox/g).length / 4) *
      bigBoxAnimationDuration +
    "s linear infinite";
  calculateAnimationWidthOf(classID);
}

//Duplicating Function
function duplicateContentOf(classID) {
  document.getElementById(classID).innerHTML =
    document.getElementById(classID).innerHTML +
    document.getElementById(classID).innerHTML +
    document.getElementById(classID).innerHTML +
    document.getElementById(classID).innerHTML;
  setWidth(classID);
}

//Reload scrollers width on window resize
window.onresize = function (event) {
  if (document.getElementById("Apps").innerHTML != originalScrollers) {
    setWidth("Apps");
  }

  if (document.getElementById("Hacks").innerHTML != originalScrollers) {
    setWidth("Hacks");
  }
};
