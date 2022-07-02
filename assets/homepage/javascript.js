// Check file Exists
function checkFileExist(urlToFile) {
  var xhr = new XMLHttpRequest()
  xhr.open('HEAD', urlToFile, false)
  xhr.send()
   
  if (xhr.status == "404") {
      return false
  } else {
      return true
  }
}

// Decode Packages File into Object Array
packages = decodePackagesFile(loadXMLDoc("/Packages"))
// Render Packages File
for (i = 0; i < packages.length; i++) {
  // Create Wrapper Link
  var a = document.createElement("a")

  a.href = packages[i].Depiction

  // Create Bigbox
  var bigBox = document.createElement("div")
  bigBox.className = "bigBox"
  // Create Package Content Holder
  var packageContentHolder = document.createElement("div")
  packageContentHolder.className = "packageContentHolder"
  // Create Tweak Name
  var packageTitle = document.createElement("span")
  packageTitle.className = "packageTitle"
  packageTitle.innerText = packages[i].Name
  // Create Tweak Description
  var packageDescription = document.createElement("span")
  packageDescription.className = "packageDescription"
  packageDescription.innerText = packages[i].Description;
  // Append Name and Description to Content Holder
  packageContentHolder.appendChild(packageTitle)
  packageContentHolder.innerHTML += "</br>"
  packageContentHolder.appendChild(packageDescription)
  // Create Package Icon
  var packageIconHolder = document.createElement("div")
  packageIconHolder.className = "packageIconHolder"
  
  var img = document.createElement("img")
  img.className = "packageicon"
  
  var srcIMG = "assets/tweak-icons/" +
    packages[i].Name
    .replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a") 
    .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e") 
    .replace(/ì|í|ị|ỉ|ĩ/g,"i") 
    .replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o") 
    .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u") 
    .replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y") 
    .replace(/đ/g,"d")
    .replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A")
    .replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E")
    .replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I")
    .replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O")
    .replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U")
    .replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y")
    .replace(/Đ/g, "D")
    .replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, "")
    .replace(/\u02C6|\u0306|\u031B/g, "")
    .replace(/ /g,"")
    .trim()
    .replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,"")

    + ".png"

  if (checkFileExist(srcIMG)) {
    urlIMG = srcIMG
  } else {
    urlIMG = "/assets/page-icons/default.png"
  }

  img.src = urlIMG

  // packageIconHolder.style.background = ;

  packageIconHolder.appendChild(img)
  // Append bigBox to a
  bigBox.appendChild(packageIconHolder)
  bigBox.appendChild(packageContentHolder)
  a.appendChild(bigBox)
  // Add to Scroller
  if (packages[i].Section == "Tweak") {
    document.getElementById("Tweaks").appendChild(a)
  } else if (packages[i].Section == "Hack") {
    document.getElementById("Hacks").appendChild(a)
  } else {
    document.getElementById("Other").appendChild(a)
  }
  
}

//Function to calculate bigBox size
function calculateBoxSize() {
  if (window.innerWidth < 900) {
    bigBoxWidth = 99
    bigBoxAnimationDuration = 1.7
  } else {
    bigBoxWidth = 436
    bigBoxAnimationDuration = 4
  }
}

//About Me Button
var topBanner = document.getElementById("topBanner")
function expandAbout() {
  topBanner.getElementsByTagName("button")[0].style.maxHeight = "0"
  topBanner.getElementsByTagName("button")[0].style.opacity = "0"
  topBanner.getElementsByTagName("button")[0].style.margin = "0"
  topBanner.getElementsByTagName("h1")[0].innerText = "Ánh"
  topBanner.getElementsByTagName("h2")[0].style.height = "0"
  document.getElementById("hiddenInfo").style.maxHeight = "5000px"
  document.getElementById("hiddenInfo").classList.add("animate")
  topBanner.getElementsByTagName("img")[0].classList.add("animate")
  setTimeout(function () {
    topBanner.getElementsByTagName("img")[0].src =
      "/assets/homepage/animoji.png"
  }, 300)
}

//Touch Display Detection
window.addEventListener(
  "touchstart",
  function onFirstTouch() {
    var touchScreenStylesheet = document.createElement("link")
    touchScreenStylesheet.type = "text/css"
    touchScreenStylesheet.rel = "stylesheet"
    touchScreenStylesheet.href = "assets/homepage/touchscreenOnly.css"
    document.head.appendChild(touchScreenStylesheet)
    window.removeEventListener("touchstart", onFirstTouch, false)
  },
  false
)