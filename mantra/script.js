// Tarayıcı dil bilgisini al
const userLanguage = navigator.language || navigator.userLanguage;

// Varsayılan dil
let currentLanguage = userLanguage.startsWith('en') ? 'en' : 'tr';

let currentStep = 0

// Dil değiştirme fonksiyonu
function changeLanguage(language) {
    currentLanguage = language;
    currentStep = 0
    updateContent();
}

// İçerik güncelleme fonksiyonu
function updateContent() {
    
    if(currentStep < 5) {
        if(currentStep == 1) {
            let music = new Audio("assets/media/please-calm-my-mind.mp3");
            music.play();  
        }
        document.getElementById('message-heading').innerText = data[currentStep].heading;
        document.getElementById('message-text').innerText = data[currentStep].text;
        currentStep++
    }
    else {
        document.getElementById('message-heading').innerText = "Mantra of the Day";
        let original = mantras[Math.floor(Math.random() * mantras.length)].text;
        for (let i = 0; i < original.length / 7; i++) {
            let indexToUpperCase = Math.floor(Math.random() * original.length); 
            let upperCaseCharacter = original.charAt(indexToUpperCase).toUpperCase();
            original = original.substring(0, indexToUpperCase) + upperCaseCharacter + original.substring(indexToUpperCase + 1);
        }
        document.getElementById('message-text').innerText = original;
    }
}

// Sayfa yüklendiğinde içeriği güncelle
window.onload = updateContent;
