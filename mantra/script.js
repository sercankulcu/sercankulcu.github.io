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
    document.getElementById('message-heading').innerText = data[currentStep].heading;
    document.getElementById('message-text').innerText = data[currentStep].text;
    currentStep++

    let tada = new Audio("assets/media/please-calm-my-mind.mp3");
    tada.play();

}

// Sayfa yüklendiğinde içeriği güncelle
window.onload = updateContent;
