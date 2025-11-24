//  بوكس المشاعر
document.getElementById('save-btn').addEventListener('click', function() {
    const emotions = document.getElementById('emotions-text').value;

    if (emotions.trim()) {

        let emotionsList = JSON.parse(localStorage.getItem('emotionsList')) || [];

        emotionsList.push({
            text: emotions,
            date: new Date().toLocaleString()
        });
        localStorage.setItem('emotionsList', JSON.stringify(emotionsList));

        alert("💛 تم حفظ مشاعرك بأمان ,, مساحتك الخاصة محفوظة فقط على جهازك.");
        document.getElementById('emotions-text').value = '';

        // 🔥 السطر المهم: خلي الزر يظهر فورًا بدون إعادة تحميل
        checkButtonVisibility();

    } else {
        alert('يرجى كتابة مشاعرك أولاً');
    }
});

document.getElementById('clear-btn').addEventListener('click', function() {
    document.getElementById('emotions-text').value = '';
    alert('تم مسح المشاعر بنجاح');
});

// المشاعر المخزنة
function checkButtonVisibility() {
    const emotionsList = JSON.parse(localStorage.getItem('emotionsList')) || [];
    const btn = document.getElementById('show-emotions-btn');

    if (emotionsList.length > 0) {
        btn.style.display = 'block';   
    } else {
        btn.style.display = 'none';   
    }
}
checkButtonVisibility();

document.getElementById('show-emotions-btn').addEventListener('click', function(e) {
    e.preventDefault();
    showSavedEmotions();
});

function showSavedEmotions() {
    const container = document.getElementById('saved-emotions');
    const deleteBtn = document.getElementById('delete-all-btn');
    const emotionsList = JSON.parse(localStorage.getItem('emotionsList')) || [];

    if (emotionsList.length === 0) {
        container.innerHTML = "<p>لا يوجد مشاعر محفوظة بعد.</p>";
        deleteBtn.style.display = 'none'; 
        return;
    }

    container.innerHTML = emotionsList.reverse().map(item => `
        <div class="emotion-card">
            <span class="date">${item.date}</span>
            <div class="text">💬 ${item.text}</div>
        </div>
    `).join('');

    deleteBtn.style.display = 'block';
}


// مسح المشاعر
document.getElementById('delete-all-btn').addEventListener('click', function() {
    const confirmDelete = confirm("هل أنتِ متأكدة إنك بدِك تحذفي كل مشاعرك؟ 😢");

    if (confirmDelete) {
        localStorage.removeItem('emotionsList');

        document.getElementById('saved-emotions').innerHTML = "";
        
        document.getElementById('delete-all-btn').style.display = 'none';
        
        document.getElementById('show-emotions-btn').style.display = 'none';

        alert("تم حذف جميع مشاعرك بنجاح");
    }
});

checkButtonVisibility();


    
//شعور المستخدم
const moodRadios = document.querySelectorAll("input[name='mood']");
const moodTip = document.querySelector(".mood-tip");

moodRadios.forEach((radio) => {
  radio.addEventListener("change", () => {
    const mood = radio.parentElement.querySelector("span").textContent.trim();

    if (mood === "قلق") {
      moodTip.textContent = "💛 نصيحة: جربي تمرين التنفّس لمدة دقيقة.";
    } else if (mood === "حزين") {
      moodTip.textContent =
        "💛 تذكري: المشاعر بتروح وبتيجي… خذي وقتك وكوني لطيفة مع نفسك.";
    } else if (mood === "مرهق") {
      moodTip.textContent = "✨ جربي تشربي مي وتاخدي استراحة قصيرة.";
    } else if (mood === "هادئ") {
      moodTip.textContent = "🌿 حافظي على هدوءك واستمتعي بالسلام الداخلي.";
    } else if (mood === "بحاجة لراحة") {
      moodTip.textContent = "🤍 خذي بريك قصير… جسمك بحاجة يسترخي.";
    } else {
      moodTip.textContent = "💛 يوم لطيف إلك إن شاء الله 🌿";
    }
  });
});

// //  مسج عشوائي يومي

// const quotes = document.querySelectorAll(".quotes .quote");

// if (quotes.length > 0) {
//   quotes.forEach((q) => (q.style.display = "none"));
//   const random = Math.floor(Math.random() * quotes.length);
//   quotes[random].style.display = "block";
// }
// رسالة اليوم
const quotes = [
    '💡 "كل خطوة صغيرة تقربك من التغيير الكبير."',
    '🌿 "تنفس بعمق، واسترح قليلاً، كل شيء سيكون أفضل."',
    '✨ "ابتسم لنفسك اليوم، فأنت تستحق السعادة."',
    '🌸 "ابدأ يومك بابتسامة وستجد الطاقة في كل شيء."',
    '🔥 "كل تحدي هو فرصة لتثبت لنفسك قدراتك."',
    '💖 "اعتنِ بنفسك اليوم، فأنت أهم شخص في حياتك."',
    '🌈 "كل يوم جديد فرصة جديدة لتكون أفضل."',
    '🌞 "انشر الحب والفرح من حولك اليوم."',
    '🌱 "تعلم شيئًا جديدًا اليوم، حتى لو كان صغيرًا."',
    '🌟 "ثق بقدرتك على التغيير والتحسين الدائم."'
  ];

  // نحسب اليوم الحالي من السنة
  const today = new Date();
  const start = new Date(today.getFullYear(), 0, 0);
  const diff = today - start;
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);

  // نختار الاقتباس حسب اليوم
  const quoteIndex = dayOfYear % quotes.length;

  // نعرض الاقتباس في الصفحة

  document.getElementById('daily-quote').textContent = quotes[quoteIndex];
