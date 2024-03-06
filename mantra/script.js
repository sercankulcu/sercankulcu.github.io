// Tarayıcı dil bilgisini al
const userLanguage = navigator.language || navigator.userLanguage;

// Varsayılan dil
let currentLanguage = userLanguage.startsWith('en') ? 'en' : 'tr';

// Dil değiştirme fonksiyonu
function changeLanguage(language) {
    currentLanguage = language;
    updateContent();
}

// İçerik güncelleme fonksiyonu
function updateContent() {

    if (currentLanguage === 'tr') {
        // Metinleri doldur
document.getElementById('welcome-heading').innerText = 'Hoş Geldiniz!';
document.getElementById('intro-text').innerText = "Meditasyona giriş sırasında akla gelen düşünceleri sakinleştirmek ve zihni huzura kavuşturmak için tasarlanmış bir yolculuğa hazır mısınız? Bizimle birlikte, meditasyonun doğasına uygun, zorlamadan ve kendi içsel ritminizle uyum içinde bir keşfe çıkın.";

document.getElementById('mantra-heading').innerText = 'Mantra: Düşüncelerin Sessiz Dansı';
document.getElementById('mantra-text').innerText = "Meditasyonun temelinde yer alan mantralar, sadece kelime grupları değil, aynı zamanda düşüncelerinizi gözlemlemenizi sağlayan bir anahtardır. Beyin, mantranın sakin ve tekrarlanan frekansına adapte olur, ancak bu bir zorlama değil, uyum içinde bir dans gibidir. Burada, mantraların sihirli ritmiyle kendi iç dünyanızda yolculuğa çıkacak ve düşüncelerin sakin dansını gözlemleyeceksiniz.";

document.getElementById('observation-heading').innerText = 'Düşünce Gözlemi ve Basitliğin Keşfi';
document.getElementById('observation-text').innerText = "Meditasyon, sadece bir durumu elde etmeye çalışmak değil, aynı zamanda düşüncelerin kısır döngüsünü anlamak ve basitliğin güzelliğini keşfetmekle ilgilidir. Burada, düşüncelerin ötesine geçip, kendi içsel ritminizle uyum içinde bir denge bulacaksınız. Mantralar, sizi meditasyonun doğasına yönlendiren bir rehber olarak kullanılmalıdır.";

document.getElementById('journey-heading').innerText = 'Zorlamadan Uyum Sağlama Yolculuğu';
document.getElementById('journey-text').innerText = "Mantralarla meditasyon, sizi kendi doğal frekansınıza uyum sağlamaya davet eden bir serüvendir. Zihinsel karmaşayı dağıtarak, düşüncelerin ötesine geçmenin sakin ve nazik bir yolunu keşfedin. Hatırlayın, bu bir yarış değil, kendi içsel keşfinizde rahatça yol alabileceğiniz bir rehberlik.";

document.getElementById('meet-yourself-heading').innerText = 'Kendinizle Buluşun, Düşüncelerinizle Dans Edin';
document.getElementById('meet-yourself-text').innerText = "Mantra ile meditasyon, sizi kendinizle buluşturacak bir anahtar sunar. Sessizce düşüncelerinizi gözlemleyin, kendi ritminizi bulun ve meditasyonun güzelliklerini keşfedin. Unutmayın, her tekrar, içsel huzurunuzun bir adım daha yakınına götürür.";

document.getElementById('last-text').innerText = "Haydi, içsel yolculuğunuz başlasın!";

    } else if (currentLanguage === 'en') {
        // Metinleri doldur
document.getElementById('welcome-heading').innerText = 'Welcome!';
document.getElementById('intro-text').innerText = "Are you ready for a journey designed to calm the thoughts that arise during meditation and bring peace to your mind? Join us as we embark on an exploration in harmony with the natural essence of meditation, allowing you to flow effortlessly with your inner rhythm.";

document.getElementById('mantra-heading').innerText = 'Mantra: The Silent Dance of Thoughts';
document.getElementById('mantra-text').innerText = "At the core of meditation are mantras, not just word combinations but also keys that enable you to observe your thoughts. The brain adapts to the tranquil and repetitive frequency of the mantra, resembling a dance of harmony rather than force. Here, you will travel within your inner world with the magical rhythm of mantras, observing the serene dance of thoughts.";

document.getElementById('observation-heading').innerText = 'Observation of Thoughts and Discovery of Simplicity';
document.getElementById('observation-text').innerText = "Meditation is not just about achieving a state but understanding the cyclical nature of thoughts and discovering the beauty of simplicity. Beyond thoughts, find balance in harmony with your inner rhythm. Mantras should be used as a guide directing you towards the nature of meditation.";

document.getElementById('journey-heading').innerText = 'Journey to Harmony Without Force';
document.getElementById('journey-text').innerText = "Meditation with mantras invites you on an adventure to align with your natural frequency. Discover a calm and gentle path beyond mental clutter, allowing you to peacefully traverse beyond your thoughts. Remember, it's not a race; it's a gentle guidance for you to comfortably progress in your inner exploration.";

document.getElementById('meet-yourself-heading').innerText = 'Meet Yourself, Dance with Your Thoughts';
document.getElementById('meet-yourself-text').innerText = "Meditation with mantras provides a key to meet yourself. Quietly observe your thoughts, find your rhythm, and explore the beauty of meditation. Each repetition brings you a step closer to your inner peace.";

document.getElementById('last-text').innerText = "Let your inner journey begin!";
    }
}

// Sayfa yüklendiğinde içeriği güncelle
window.onload = updateContent;
