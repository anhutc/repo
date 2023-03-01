/*=============== FILTERS TABS ===============*/
const tabs = document.querySelectorAll('[data-target]'),
      tabContents = document.querySelectorAll('[data-content]')

tabs.forEach(tab =>{
    tab.addEventListener('click', () =>{
        const target = document.querySelector(tab.dataset.target)

        tabContents.forEach(tc =>{
            tc.classList.remove('filters__active')
        })
        target.classList.add('filters__active')

        tabs.forEach(t =>{
            t.classList.remove('filter-tab-active')
        })
        tab.classList.add('filter-tab-active')
    })
})

/*=============== DARK LIGHT THEME ===============*/
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'ri-sun-line'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'ri-moon-line' : 'ri-sun-line'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'ri-moon-line' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
})

sr.reveal(`.profile__border`)
sr.reveal(`.profile__name`, {delay: 500})
sr.reveal(`.profile__profession`, {delay: 600})
sr.reveal(`.profile__social`, {delay: 700})
sr.reveal(`.profile__info-group`, {interval: 100, delay: 700})
sr.reveal(`.profile__buttons`, {delay: 800})
sr.reveal(`.filters__content`, {delay: 900})
sr.reveal(`.filters`, {delay: 1000})


function compatible(works_min, works_max, tweak_compatibility) {
    let currentiOS = parseFloat(('' + (/CPU.*OS ([0-9_]{1,})|(CPU like).*AppleWebKit.*Mobile/i.exec(navigator.userAgent) || [0,''])[1]).replace('undefined', '3_2').replace('_', '.').replace('_', ''));
    works_min = numerize(works_min);
    works_max = numerize(works_max);
    let el = document.querySelector(".compatibility");
    if (currentiOS < works_min) {
        el.innerHTML = "Your version of iOS is too old for this package. This package works on " + tweak_compatibility + ".";
        el.classList.add("red")
    } else if(currentiOS > works_max) {
        el.innerHTML = "Your version of iOS is too new for this package. This package works on " + tweak_compatibility + ".";
        el.classList.add("red")
    } else if(String(currentiOS) != "NaN") {
        el.innerHTML = "This package works on your device!";
        el.classList.add("green")
    }
}
function numerize(x) {
    return x.substring(0,x.indexOf(".")) + "." + x.substring(x.indexOf(".")+1).replace(".","")
}
function swap(hide, show) {
    for (var i = document.querySelectorAll(hide).length - 1; i >= 0; i--) {
        document.querySelectorAll(hide)[i].style.display = "none";
    }
    for (var i = document.querySelectorAll(show).length - 1; i >= 0; i--) {
        document.querySelectorAll(show)[i].style.display = "block";
    }
    document.querySelector(".nav_btn" + show + "_btn").classList.add("active");
    document.querySelector(".nav_btn" + hide + "_btn").classList.remove("active")
}

function externalize() {
    for (var i = document.querySelectorAll("a").length - 1; i >= 0; i--) {
        document.querySelectorAll("a")[0].setAttribute("target","blank")
    }
}
function darkMode(isOled) {
    var darkColor = isOled ? "black" : "#161616";
    document.querySelector("body").style.color = "white";
    document.querySelector("body").style.background = darkColor;
    for (var i = document.querySelectorAll(".subtle_link, .subtle_link > div > div, .subtle_link > div > div > p").length - 1; i >= 0; i--) {
        document.querySelectorAll(".subtle_link, .subtle_link > div > div, .subtle_link > div > div > p")[i].style.color = "white";
    }
}
if (navigator.userAgent.toLowerCase().indexOf("dark") != -1) {
    darkMode(navigator.userAgent.toLowerCase().indexOf("oled") != -1 || navigator.userAgent.toLowerCase().indexOf("pure-black") != -1);
}

new cursoreffects.emojiCursor({ element: document.querySelector("#emoji") })

function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'en'
    }, 'google_translate_element');
}