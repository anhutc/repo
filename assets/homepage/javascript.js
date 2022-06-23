
// Check file Exists
function checkFileExist(urlToFile) {
  var xhr = new XMLHttpRequest();
  xhr.open('HEAD', urlToFile, false);
  xhr.send();
   
  if (xhr.status == "404") {
      return false;
  } else {
      return true;
  }
}

// Decode Packages File into Object Array
packages = decodePackagesFile(loadXMLDoc("/Packages"));
// Render Packages File
for (i = 0; i < packages.length; i++) {
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
  
  var img = document.createElement("img");
  img.className = "packageicon";
  
  var srcIMG = "/assets/page-icons/" +
  packages[i].Name.replace(/ |-|:|;/g, "").toLowerCase() +
  ".png";

  if (checkFileExist(srcIMG)) {
    urlIMG = srcIMG;
  } else {
    urlIMG = "/assets/page-icons/example.png";
  }

  img.src = urlIMG;

  // packageIconHolder.style.background = getAverageRGB();

  const colorThief = new ColorThief();

  if (img.complete) {
    packageIconHolder.style.background = colorThief.getColor(img);
  } else {
    img.addEventListener('load', function() {
      packageIconHolder.style.background = colorThief.getColor(img);
    });
  }
  console.log(colorThief.getColor(img));

  packageIconHolder.appendChild(img);
  // Append bigBox to a
  bigBox.appendChild(packageIconHolder);
  bigBox.appendChild(packageContentHolder);
  a.appendChild(bigBox);
  // Add to Scroller
  if (packages[i].Section == "Apps") {
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