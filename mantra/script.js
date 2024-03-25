// Tarayıcı dil bilgisini al
const userLanguage = navigator.language || navigator.userLanguage;

// Varsayılan dil
let currentLanguage = userLanguage.startsWith('en') ? 'en' : 'tr';
const textInput = document.getElementById("textInput");
const nextButton = document.getElementById("nextButton");
let currentMantra = "";

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
        let random = Math.floor(Math.random() * mantras.length);
        document.getElementById('message-heading').innerText = "Mantra of the Day";
        let original = mantras[random].text;
        for (let i = 0; i < original.length / 7; i++) {
            let indexToUpperCase = Math.floor(Math.random() * original.length); 
            let upperCaseCharacter = original.charAt(indexToUpperCase).toUpperCase();
            original = original.substring(0, indexToUpperCase) + upperCaseCharacter + original.substring(indexToUpperCase + 1);
        }
        currentMantra = original;
        document.getElementById('message-text').innerText = mantras[random].text_original + String.fromCharCode(13) + original;
        textInput.style.display = "block";
        nextButton.disabled = true;
          textInput.value = "";
          textInput.placeholder = "Write here";
    }
}


textInput.addEventListener("input", function(event) {
      const inputText = event.target.value.trim();

      let comparisonResult = true;

      for (let i = 0; i < inputText.length; i++) {
        if (inputText[i] !== currentMantra[i]) {
          comparisonResult = false;
          break;
        }
      }

      if(comparisonResult == false) {
          textInput.style.border = "solid 3px red";
      } else {
          textInput.style.border = "solid 3px green";
      }

      if (inputText === currentMantra) {
          nextButton.disabled = false;
      } else {
          nextButton.disabled = true;
      }
    });

// Sayfa yüklendiğinde içeriği güncelle
window.onload = updateContent;
