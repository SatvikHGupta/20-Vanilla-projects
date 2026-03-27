const questions = [
  {q:'Which language is primarily used to style web pages?',choices:['JavaScript','CSS','Python','Ruby'],answer:1},
  {q:'Which HTML element holds the main content of a page?',choices:['aside','section','main','footer'],answer:2},
  {q:'What does ARIA primarily improve?',choices:['Performance','Accessibility','SEO','Animations'],answer:1},
  {q:'Which CSS layout module is best for 2D layouts?',choices:['Flexbox','Grid','Float','Position'],answer:1},
  {q:'Which event listens for a click on a button?',choices:['keydown','input','click','submit'],answer:2},
  {q:'What is the correct HTML tag for a paragraph?',choices:['<p>','<para>','<text>','<div>'],answer:0}
];

let state={index:0,score:0,answered:false};
let qIndexEl=document.getElementById('qIndex');
let scoreEl=document.getElementById('score');
let questionText=document.getElementById('questionText');
let choicesForm=document.getElementById('choicesForm');
let choiceButtons=Array.from(document.querySelectorAll('.choice'));
let nextBtn=document.getElementById('nextBtn');
let prevBtn=document.getElementById('prevBtn');
let progressBar=document.getElementById('progressBar');
const resetBtn=document.getElementById('resetBtn');
const themeToggle=document.getElementById('themeToggle');
const themeIcon=document.getElementById('themeIcon');

function loadTheme(){
  const saved=localStorage.getItem('qq_theme')||'dark';
  if(saved==='light'){document.documentElement.setAttribute('data-theme','light');themeToggle.setAttribute('aria-pressed','true');themeIcon.textContent='Light'}
  else{document.documentElement.removeAttribute('data-theme');themeToggle.setAttribute('aria-pressed','false');themeIcon.textContent='Dark'}
}

function saveTheme(t){localStorage.setItem('qq_theme',t)}

function render(){
  const q=questions[state.index];
  qIndexEl.textContent=`Question ${state.index+1} of ${questions.length}`;
  scoreEl.textContent=`Score: ${state.score}`;
  questionText.textContent=q.q;
  choiceButtons.forEach((btn,i)=>{btn.textContent=q.choices[i]||'';btn.disabled=state.answered;btn.removeAttribute('aria-checked');btn.classList.remove('correct','incorrect');btn.tabIndex=0});
  updateProgress();
  prevBtn.disabled=state.index===0;
  nextBtn.disabled=!state.answered&&state.index===questions.length-1;
  nextBtn.textContent=state.index===questions.length-1?'Finish':'Next';
  animateIn();
}

function updateProgress(){
  const pct=Math.round((state.index/questions.length)*100);
  progressBar.style.width=`${pct}%`;
  progressBar.setAttribute('aria-valuenow',pct);
}

function animateIn(){
  const card=document.getElementById('card');
  card.classList.remove('fade-out');
  void card.offsetWidth;
  card.classList.add('fade-in','slide-in');
  setTimeout(()=>{card.classList.remove('fade-in','slide-in')},350);
}

function animateOut(cb){
  const card=document.getElementById('card');
  card.classList.add('fade-out');
  setTimeout(()=>{card.classList.remove('fade-out');cb&&cb()},250);
}

function handleChoice(e){
  if(state.answered)return;
  const btn=e.currentTarget;
  const selected=Number(btn.dataset.index);
  const correct=questions[state.index].answer;
  state.answered=true;
  if(selected===correct){btn.classList.add('correct');state.score+=1}
  else{btn.classList.add('incorrect');choiceButtons[correct].classList.add('correct')}
  choiceButtons.forEach(b=>b.disabled=true);
  scoreEl.textContent=`Score: ${state.score}`;
  nextBtn.disabled=false;
}

function goto(index){
  if(index<0||index>=questions.length)return;
  animateOut(()=>{state.index=index;state.answered=false;render()});
}

function next(){
  if(!state.answered&&state.index<questions.length-1)return;
  if(state.index<questions.length-1)goto(state.index+1);
  else showResults();
}

function prev(){if(state.index>0)goto(state.index-1)}

function showResults(){
  animateOut(()=>{
    const card=document.getElementById('card');
    card.innerHTML=`<div class="stage"><div class="meta"><span class="q-index">Finished</span><span class="score">Score: ${state.score}/${questions.length}</span></div><h2 class="question">Well done!</h2><p style="color:var(--muted);margin:8px 0 0">You answered ${state.score} out of ${questions.length} correctly.</p><div style="display:flex;gap:10px;margin-top:14px"><button id="restart" class="primary-btn">Play Again</button><button id="review" class="ghost-btn">Review Answers</button></div></div>`;
    setTimeout(()=>{document.getElementById('restart').addEventListener('click',reset);document.getElementById('review').addEventListener('click',reviewAnswers)},50);
  });
}

function reviewAnswers(){
  animateOut(()=>{
    const card=document.getElementById('card');
    const list=questions.map((q,i)=>{const correct=q.choices[q.answer];return `<li style="margin-bottom:10px"><strong>Q${i+1}:</strong> ${escapeHtml(q.q)}<div style="color:var(--muted);margin-top:6px"><strong>Answer:</strong> ${escapeHtml(correct)}</div></li>`}).join('');
    card.innerHTML=`<div class="stage"><h2 class="question">Review</h2><ol style="margin-top:12px;padding-left:18px;color:var(--txt)">${list}</ol><div style="display:flex;gap:10px;margin-top:14px"><button id="back" class="ghost-btn">Back</button><button id="restart2" class="primary-btn">Play Again</button></div></div>`;
    setTimeout(()=>{document.getElementById('back').addEventListener('click',reset);document.getElementById('restart2').addEventListener('click',reset)},50);
  });
}

function escapeHtml(str){return String(str).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}

function reset(){state={index:0,score:0,answered:false};loadTemplate();render()}

function loadTemplate(){
  const html=`<div class="progress"><div class="progress-bar" id="progressBar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"></div></div><div class="stage"><div class="meta"><span class="q-index" id="qIndex">Question 1</span><span class="score" id="score">Score: 0</span></div><h2 id="questionText" class="question">Question text</h2><form id="choicesForm" class="choices" role="list" aria-label="Answer choices"><button type="button" class="choice" data-index="0" role="listitem"></button><button type="button" class="choice" data-index="1" role="listitem"></button><button type="button" class="choice" data-index="2" role="listitem"></button><button type="button" class="choice" data-index="3" role="listitem"></button></form><div class="actions"><button id="prevBtn" class="ghost-btn" disabled>Prev</button><button id="nextBtn" class="primary-btn" disabled>Next</button></div></div>`;
  const card=document.getElementById('card');
  card.innerHTML=html;
  bindElements();
}

function bindElements(){
  qIndexEl=document.getElementById('qIndex');
  scoreEl=document.getElementById('score');
  questionText=document.getElementById('questionText');
  choicesForm=document.getElementById('choicesForm');
  choiceButtons.splice(0,choiceButtons.length,...Array.from(document.querySelectorAll('.choice')));
  nextBtn=document.getElementById('nextBtn');
  prevBtn=document.getElementById('prevBtn');
  progressBar=document.getElementById('progressBar');
  choiceButtons.forEach(btn=>{btn.addEventListener('click',handleChoice);btn.addEventListener('keydown',choiceKeyNav)});
  nextBtn.addEventListener('click',next);
  prevBtn.addEventListener('click',prev);
}

function choiceKeyNav(e){
  const key=e.key;const current=e.currentTarget;
  if(key==='Enter'||key===' '){e.preventDefault();current.click();return}
  if(key==='ArrowDown'||key==='ArrowRight'){e.preventDefault();const idx=Number(current.dataset.index);const nxt=choiceButtons.find(b=>Number(b.dataset.index)===(idx+1)%choiceButtons.length);nxt&&nxt.focus();return}
  if(key==='ArrowUp'||key==='ArrowLeft'){e.preventDefault();const idx=Number(current.dataset.index);const prevIdx=(idx-1+choiceButtons.length)%choiceButtons.length;const prv=choiceButtons.find(b=>Number(b.dataset.index)===prevIdx);prv&&prv.focus();return}
}

function attachGlobal(){
  choiceButtons.forEach(btn=>{
    btn.addEventListener('click',handleChoice);
    btn.addEventListener('keydown',choiceKeyNav);
  });
  nextBtn.addEventListener('click',next);
  prevBtn.addEventListener('click',prev);
  resetBtn.addEventListener('click',reset);
  themeToggle.addEventListener('click',()=>{
    const isLight=document.documentElement.getAttribute('data-theme')==='light';
    if(isLight){
      document.documentElement.removeAttribute('data-theme');
      themeIcon.textContent='Dark';
      themeToggle.setAttribute('aria-pressed','false');
      saveTheme('dark');
    }else{
      document.documentElement.setAttribute('data-theme','light');
      themeIcon.textContent='Light';
      themeToggle.setAttribute('aria-pressed','true');
      saveTheme('light');
    }
  });
  document.addEventListener('keydown',e=>{
    if(e.key==='ArrowRight')next();
    if(e.key==='ArrowLeft')prev();
  });
}

loadTheme();
loadTemplate();
bindElements();
render();
attachGlobal();
