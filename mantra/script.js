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
    if(currentStep == 0) {
        let music = new Audio("assets/media/please-calm-my-mind.mp3");
        music.play();  
    }
    if(currentStep < 5) {
        document.getElementById('message-heading').innerText = data[currentStep].heading;
        document.getElementById('message-text').innerText = data[currentStep].text;
        currentStep++
    }
    else {
        document.getElementById('message-heading').innerText = "Mantra of the Day";
        document.getElementById('message-text').innerText = mantras[Math.floor(Math.random() * mantras.length)].text;
    }
}

// Sayfa yüklendiğinde içeriği güncelle
window.onload = updateContent;
