let currentStep = 0; // 0: 시작화면, 1~10: 문제, 11: 결과
let selectedAnswers = []; // [0,2,1,...] 각 문제별 선택 인덱스

const container = document.getElementById('game-container');

function render() {
  container.innerHTML = '';
  if (currentStep === 0) {
    renderStart();
  } else if (currentStep >= 1 && currentStep <= QUIZ_LIST.length) {
    renderQuiz();
  } else if (currentStep === QUIZ_LIST.length + 1) {
    renderResult();
  }
}

function renderStart() {
  const box = document.createElement('div');
  box.className = 'quiz-box';
  box.innerHTML = `
    <div>
      <div class="quiz-title">나는 어떤 기후정책 정치가와 닮았을까?</div>
      <div class="quiz-subtitle">10개의 정책 선택으로 알아보는 나의 기후정책 성향<br><br>
        저신다 아던, 조 바이든, 에마뉘엘 마크롱, 자이르 보우소나루, 시진핑 중에 당신과 가장 닮은 리더는?</div>
    </div>
    <button class="start-btn">시작하기</button>
  `;
  box.querySelector('.start-btn').onclick = () => {
    currentStep = 1;
    selectedAnswers = [];
    render();
  };
  container.appendChild(box);
}

function renderQuiz() {
  const idx = currentStep - 1;
  const quiz = QUIZ_LIST[idx];

  const box = document.createElement('div');
  box.className = 'quiz-box';

  const progress = `
    <div class="progress-bar-bg">
      <div class="progress-bar-fill" style="width: ${(currentStep-1)/QUIZ_LIST.length*100}%"></div>
    </div>
  `;

  let choicesHtml = '';
  for (let i = 0; i < quiz.choices.length; i++) {
    choicesHtml += `<button class="choice-btn" data-index="${i}">${quiz.choices[i]}</button>`;
  }

  box.innerHTML = `
    ${progress}
    <div class="question-text">${quiz.question}</div>
    <div class="choices-list">
      ${choicesHtml}
    </div>
    <button class="next-btn" style="display:none">다음</button>
  `;

  const btns = box.querySelectorAll('.choice-btn');
  btns.forEach((btn, i) => {
    btn.onclick = () => {
      btns.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedAnswers[idx] = i;
      box.querySelector('.next-btn').style.display = '';
    };
    btn.onmouseenter = () => btn.classList.add('hover');
    btn.onmouseleave = () => btn.classList.remove('hover');
  });

  box.querySelector('.next-btn').onclick = () => {
    currentStep++;
    render();
  };

  if (typeof selectedAnswers[idx] === 'number') {
    btns[selectedAnswers[idx]].classList.add('selected');
    box.querySelector('.next-btn').style.display = '';
  }

  container.appendChild(box);
}

function renderResult() {
  const scores = [0,0,0,0,0];
  for (const ans of selectedAnswers) {
    if (typeof ans === 'number') scores[ans]++;
  }
  const maxScore = Math.max(...scores);
  const maxIndexes = scores.map((v,i)=>v===maxScore?i:-1).filter(i=>i!==-1);
  const mainIdx = maxIndexes[0];

  const box = document.createElement('div');
  box.className = 'quiz-box';

  box.innerHTML = `
    <div class="result-section">
      <div class="result-title">가장 닮은 정치가: ${PRESIDENTS[mainIdx].name}</div>
      <img src="${PRESIDENTS[mainIdx].img}" class="result-img" alt="${PRESIDENTS[mainIdx].name}">
      <div class="result-desc">${PRESIDENTS[mainIdx].desc}</div>
      <button class="restart-btn">다시 해보기</button>
    </div>
    <div class="result-list">
      ${PRESIDENTS.map((pres,i)=>`
        <div class="result-row">
          <img src="${pres.img}" class="result-img" alt="${pres.name}">
          <div class="pres-name">${pres.name}</div>
          <div class="rate">${Math.round(scores[i]/QUIZ_LIST.length*100)}% 일치</div>
        </div>
      `).join('')}
    </div>
  `;
  box.querySelector('.restart-btn').onclick = () => {
    currentStep = 0;
    selectedAnswers = [];
    render();
  };
  container.appendChild(box);
}

window.onload = render;
