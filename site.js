
(function(){
  function setLang(l){
    document.querySelectorAll('[data-uz]').forEach(function(el){ el.textContent = el.getAttribute('data-'+l); });
    document.documentElement.lang = l === 'uz' ? 'uz' : 'en';
    document.getElementById('lang-uz').setAttribute('aria-pressed', l==='uz');
    document.getElementById('lang-en').setAttribute('aria-pressed', l==='en');
    try{ localStorage.setItem('lang', l); }catch(e){}
  }
  document.getElementById('lang-uz').onclick = function(){ setLang('uz'); };
  document.getElementById('lang-en').onclick = function(){ setLang('en'); };
  try{ var s = localStorage.getItem('lang'); if (s === 'en') setLang('en'); }catch(e){}
  document.querySelectorAll('.copy').forEach(function(b){
    b.addEventListener('click', function(){
      var el = document.getElementById(b.getAttribute('data-copy'));
      var done = function(){ var t=b.textContent; b.textContent='✓'; setTimeout(function(){ b.textContent=t; },1200); };
      var sel = function(){ var r=document.createRange(); r.selectNodeContents(el); var s=getSelection(); s.removeAllRanges(); s.addRange(r); };
      if (navigator.clipboard) navigator.clipboard.writeText(el.textContent).then(done, sel); else sel();
    });
  });
})();


(function(){
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var g = document.getElementById('greet'), gi = 0, words = ['Salom!','Hello!','Привет!'];
  if (!reduce) setInterval(function(){ gi=(gi+1)%words.length; g.textContent=words[gi]; g.classList.remove('swap'); void g.offsetWidth; g.classList.add('swap'); }, 2200);
  var t = document.getElementById('typed');
  var roles = { uz:['Ingliz tili o\'qituvchisi','IELTS 7.0','Compass School Head Teacher','Material muallifi'], en:['English teacher','IELTS 7.0','Head Teacher at Compass School','Materials author'] };
  var ri=0, ci=0, del=false;
  function lang(){ return document.documentElement.lang==='en'?'en':'uz'; }
  function tick(){
    var list=roles[lang()], w=list[ri%list.length];
    if (reduce){ t.textContent=w; return; }
    ci += del ? -1 : 1; t.textContent = w.slice(0,ci);
    var d = del ? 35 : 75;
    if (!del && ci===w.length){ del=true; d=1400; }
    else if (del && ci===0){ del=false; ri++; d=300; }
    setTimeout(tick,d);
  }
  tick();
})();
