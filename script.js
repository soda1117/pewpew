// 결과 화면 렌더링 부분만 발췌(이미지 번호 반영)
function renderResult() {
  // 각 대통령별 점수 계산
  const scores = [0,0,0,0,0];
  for (const ans of selectedAnswers) {
    if (typeof ans === 'number') scores[ans]++;
  }
  // 가장 점수 높은 사람 찾기
  const maxScore = Math.max(...scores);
  const maxIndexes = scores.map((v,i)=>v===maxScore?i:-1).filter(i=>i!==-1);
  const mainIdx = maxIndexes[0];

  // 이미지 번호 매핑
  const presidentImages = [
    "image5", // 저신다 아던
    "image2", // 조 바이든
    "image3", // 에마뉘엘 마크롱
    "image4", // 자이르 보우소나루
    "image1", // 시진핑
  ];

  // 결과 화면
  const box = document.createElement('div');
  box.className = 'quiz-box';

  // 메인 결과
  box.innerHTML = `
    <div class="result-section">
      <div class="result-title">가장 닮은 정치가: ${PRESIDENTS[mainIdx].name}</div>
      <img src="${presidentImages[mainIdx]}" class="result-img" alt="${PRESIDENTS[mainIdx].name}">
      <div class="result-desc">${PRESIDENTS[mainIdx].desc}</div>
      <button class="restart-btn">다시 해보기</button>
    </div>
    <div class="result-list">
      ${PRESIDENTS.map((pres,i)=>`
        <div class="result-row">
          <img src="${presidentImages[i]}" class="result-img" alt="${pres.name}">
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
