/*================================
    VARIABLES
=================================*/

const changeLanguageLink = document.querySelector('#change-language-link')
const english = document.querySelectorAll('.en');
const dutch = document.querySelectorAll('.nl');


/*================================
    EVENT LISTENER
=================================*/

changeLanguageLink.addEventListener('click', (event) => {

    let lang = event.target.dataset.lang;
    changeLanguage(lang);
});


/*================================
    CHANGE LANGUAGE FUNCTION
=================================*/

function changeLanguage(lang) {

    if (lang == 'eng') {
        english.forEach(el => {
            el.style.display = 'block';
        });

        dutch.forEach(el => {
            el.style.display = 'none';
        });

        changeLanguageLink.dataset.lang = 'nl';
        changeLanguageLink.innerHTML = 'Bekijk deze site in het Nederlands';
        setLocalStorage(lang);
    }
    else {
        dutch.forEach(el => {
            el.style.display = 'block';
        });

        english.forEach(el => {
            el.style.display = 'none';
        });

        changeLanguageLink.dataset.lang = 'eng';
        changeLanguageLink.innerHTML = 'View this site in English';
        setLocalStorage(lang);
    }
}


/*================================
    SET LOCAL STORAGE
=================================*/

function setLocalStorage(lang) {
    let userLang = {
        lang: lang
    }

    let userLanguage = JSON.stringify(userLang);
    localStorage.setItem('userLanguage', userLanguage);
}

/*================================
    CHECK LOCAL STORAGE - 
    - FIRES ON EVERY PAGE LOAD
=================================*/

function checkLocalStorage() {

    if ('userLanguage' in localStorage) {
        let userLanguage = localStorage.getItem('userLanguage');
        let userLang = JSON.parse(userLanguage);
     
        if (userLang.lang == 'nl') {
            changeLanguage('nl');
        }
        else {
            changeLanguage('eng')
        }
    }
}
checkLocalStorage();