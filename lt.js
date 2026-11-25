(function(){
var root=document.getElementById("lt-root"); if(!root) return;
var Q=[{"q": "I ___ a student.", "o": ["am", "is", "are", "be"], "a": 0}, {"q": "___ is your name?", "o": ["Who", "What", "Where", "How"], "a": 1}, {"q": "She ___ two brothers.", "o": ["have", "has", "is", "having"], "a": 1}, {"q": "There ___ a book on the table.", "o": ["are", "be", "is", "am"], "a": 2}, {"q": "I ___ in Tashkent.", "o": ["lives", "living", "live", "am live"], "a": 2}, {"q": "Yesterday I ___ to the cinema.", "o": ["go", "went", "gone", "goes"], "a": 1}, {"q": "He can ___ very fast.", "o": ["runs", "running", "to run", "run"], "a": 3}, {"q": "Is there ___ milk in the fridge?", "o": ["any", "a", "many", "an"], "a": 0}, {"q": "Tashkent is ___ than Bukhara.", "o": ["big", "biggest", "bigger", "more big"], "a": 2}, {"q": "Have you ever ___ to Seoul?", "o": ["go", "went", "been", "going"], "a": 2}, {"q": "I ___ TV when the phone rang.", "o": ["watched", "was watching", "am watching", "watch"], "a": 1}, {"q": "If it rains tomorrow, we ___ at home.", "o": ["stay", "would stay", "will stay", "stayed"], "a": 2}, {"q": "I've lived here ___ 2020.", "o": ["for", "since", "from", "ago"], "a": 1}, {"q": "The bridge ___ in 1990.", "o": ["built", "was built", "is building", "has built"], "a": 1}, {"q": "I'm not used to ___ up early.", "o": ["get", "got", "getting", "gets"], "a": 2}, {"q": "If I ___ more time, I would learn Japanese.", "o": ["have", "had", "will have", "would have"], "a": 1}, {"q": "She asked me where ___.", "o": ["do I live", "I lived", "did I live", "I live?"], "a": 1}, {"q": "You ___ have told me earlier, I could have helped!", "o": ["must", "should", "can", "would"], "a": 1}, {"q": "He must ___ the keys; he can't find them anywhere.", "o": ["lose", "have lost", "lost", "be losing"], "a": 1}, {"q": "The man ___ car was stolen called the police.", "o": ["who", "which", "whose", "that"], "a": 2}];
var T={
 skip:["Bilmayman, o'tkazib yuborish →","I don't know, skip →","Не знаю, пропустить →"],
 res:["Natijangiz","Your result","Ваш результат"],
 correct:["To'g'ri javoblar: ","Correct answers: ","Правильных ответов: "],
 again:["Qayta topshirish","Try again","Пройти заново"],
 adTag:["Siz uchun kurs","A course for you","Курс для вас"],
 adTitle:["Onlayn General English kursi","Online General English course","Онлайн-курс General English"],
 adStart:["Siz <b>%s</b> bosqichidan boshlaysiz.","You will start at the <b>%s</b> stage.","Вы начнёте с этапа <b>%s</b>."],
 adStartTop:["Kursni yaxshi tugatganlar kabi, sizga <b>Multilevel/IELTS</b> kursi mos keladi.","Like strong course graduates, you are ready for the <b>Multilevel/IELTS</b> course.","Как и лучшим выпускникам курса, вам подходит курс <b>Multilevel/IELTS</b>."],
 adP:["Beginner → Intermediate · Telegram orqali onlayn","Beginner → Intermediate · online via Telegram","Beginner → Intermediate · онлайн в Telegram"],
 price:["so'm · butun kurs","UZS · full course","сум · весь курс"],
 seats:["joy band, 30 kishi yig'ilganda boshlanadi","seats taken, starts at 30","мест занято, старт при 30"],
 nopay:["Oldindan to'lov yo'q: to'lov guruh to'lgandan keyin.","No upfront payment: you pay once the group is full.","Без предоплаты: оплата после набора группы."],
 cta:["Kursga yozilish →","Join the course →","Записаться на курс →"],
 plan:["Kurs rejasi","Course plan","План курса"]};
var LV=[
 ["A1","Beginner",["Asosiy so'zlar va oddiy gaplardan boshlaymiz.","We start from basic words and simple sentences.","Начнём с базовых слов и простых предложений."]],
 ["A2","Elementary",["Asoslarni bilasiz, endi erkinroq gapirishni o'rganamiz.","You know the basics; now we build fluency.","Основы вы знаете, теперь учимся говорить свободнее."]],
 ["B1","Pre-Intermediate",["Yaxshi poydevor bor, murakkab zamonlar va fikr bildirishga o'tamiz.","Solid foundation; next come complex tenses and opinions.","Хорошая база, дальше сложные времена и выражение мнения."]],
 ["B1+","Intermediate",["Zo'r natija! Erkin muloqot va imtihonlarga tayyor poydevor qolmoqda.","Great result! Fluency and exam-ready foundations are next.","Отличный результат! Дальше свободное общение и база для экзаменов."]],
 ["B2+","Upper-Intermediate+",["Ajoyib! Sizga Multilevel/IELTS tayyorgarligi mos keladi.","Excellent! Multilevel/IELTS preparation suits you.","Превосходно! Вам подходит подготовка к Multilevel/IELTS."]]];
function L(){var l=document.documentElement.lang;return l==="en"?1:l==="ru"?2:0;}
function t(k){return T[k][L()];}
root.innerHTML='<div class="lt-progress"><div class="bar"><i class="lt-fill"></i></div><span class="lt-step">1 / 20</span></div>'+
 '<div class="lt-card"><p class="lt-q"></p><div class="lt-opts"></div><button class="lt-skip" type="button"></button></div>'+
 '<div class="lt-result" hidden></div>';
var fill=root.querySelector(".lt-fill"),step=root.querySelector(".lt-step"),card=root.querySelector(".lt-card"),q=root.querySelector(".lt-q"),opts=root.querySelector(".lt-opts"),skip=root.querySelector(".lt-skip"),res=root.querySelector(".lt-result");
var i=0,score=0;
function show(){var it=Q[i];step.textContent=(i+1)+" / "+Q.length;fill.style.width=(i/Q.length*100)+"%";q.textContent=(i+1)+". "+it.q;skip.textContent=t("skip");opts.innerHTML="";
 it.o.forEach(function(o,k){var b=document.createElement("button");b.type="button";b.className="lt-opt";b.textContent=o;b.onclick=function(){next(k);};opts.appendChild(b);});}
function next(k){if(k===Q[i].a)score++;i++;if(i<Q.length)show();else done();}
function lvl(s){return s<=5?0:s<=10?1:s<=15?2:s<=18?3:4;}
function done(){
 fill.style.width="100%";card.hidden=true;res.hidden=false;var n=lvl(score),lv=LV[n];
 var start=n<4?t("adStart").replace("%s",LV[n][1]):t("adStartTop");
 res.innerHTML='<div class="eyebrow">'+t("res")+'</div><div class="lt-level"><b>'+lv[0]+'</b><span>'+lv[1]+'</span></div>'+
  '<p class="lt-score">'+t("correct")+score+' / '+Q.length+'</p><p class="lead" style="margin-top:6px">'+lv[2][L()]+'</p>'+
  '<div class="lt-ad"><div class="lt-ad-top"><span class="lt-tag">🚀 '+t("adTag")+'</span></div><h3>'+t("adTitle")+'</h3><p class="lt-ad-p">'+t("adP")+'</p>'+
  '<p class="lt-ad-start">'+start+'</p>'+
  '<div class="lt-ad-facts"><div><b>449 000</b><span>'+t("price")+'</span></div><div><b class="lt-seats">—/30</b><span>'+t("seats")+'</span></div></div>'+
  '<p class="lt-ad-note">'+t("nopay")+'</p>'+
  '<div class="ctas"><a class="btn primary" href="course.html#apply">'+t("cta")+'</a><a class="btn" href="course.html#plan">'+t("plan")+'</a><button class="btn lt-again" type="button">'+t("again")+'</button></div></div>';
 fetch("https://azizjon-apply.azizjonielts.workers.dev/count").then(function(r){return r.json();}).then(function(d){var e=res.querySelector(".lt-seats");if(e)e.textContent=d.count+"/30";}).catch(function(){});
 try{localStorage.setItem("lt-level",lv[1]);}catch(e){}
 res.querySelector(".lt-again").onclick=function(){i=0;score=0;res.hidden=true;card.hidden=false;show();};
 res.scrollIntoView({behavior:"smooth",block:"start"});
}
skip.onclick=function(){next(-1);};
["lang-uz","lang-en","lang-ru"].forEach(function(id){var b=document.getElementById(id);if(b)b.addEventListener("click",function(){if(!card.hidden)show();});});
show();
})();
