document.addEventListener('DOMContentLoaded', () => {
    const startScreen = document.getElementById('start-screen');
    const quizScreen = document.getElementById('quiz-screen');
    const resultScreen = document.getElementById('result-screen');
    const startButton = document.getElementById('start-button');
    const progressBar = document.getElementById('progress-bar');
    const questionNumberElement = document.getElementById('question-number');
    const questionTextElement = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const resultPresidentPhoto = document.getElementById('result-president-photo');
    const resultPresidentName = document.getElementById('result-president-name');
    const resultMatchRate = document.getElementById('result-match-rate');
    const otherPresidentsList = document.getElementById('other-presidents-list');

    let currentQuestionIndex = 0;
    let scores = {
        ardern: 0,
        biden: 0,
        macron: 0,
        bolsonaro: 0,
        xi: 0
    };
    const totalQuestions = quizQuestions.length;

    // 화면 전환 함수 (수정됨)
    function showScreen(screenToShow) {
        const screens = [startScreen, quizScreen, resultScreen];
        // 모든 화면에서 active 클래스 제거
        screens.forEach(screen => {
            screen.classList.remove('active');
            // 여기서는 style.display = 'none';을 제거합니다.
            // CSS의 visibility와 opacity 전환으로 충분합니다.
        });

        // 보여줄 화면만 active 클래스 부여
        screenToShow.classList.add('active');
    }

    // 퀴즈 시작
    startButton.addEventListener('click', () => {
        currentQuestionIndex = 0;
        // 점수 초기화
        for (let president in scores) {
            scores[president] = 0;
        }
        showScreen(quizScreen); // 퀴즈 화면으로 전환
        loadQuestion();
    });

    // 질문 로드
    function loadQuestion() {
        if (currentQuestionIndex < totalQuestions) {
            const questionData = quizQuestions[currentQuestionIndex];
            questionNumberElement.textContent = `Q${currentQuestionIndex + 1}.`;
            questionTextElement.textContent = questionData.question;
            optionsContainer.innerHTML = ''; // 기존 선택지 지우기

            questionData.options.forEach((option, index) => {
                const button = document.createElement('button');
                button.classList.add('option-button');
                button.textContent = option.text;
                button.dataset.president = option.president; // 선택지에 해당하는 대통령 ID 저장

                // 클릭 이벤트 리스너 추가
                button.addEventListener('click', () => selectOption(button, option.president));

                optionsContainer.appendChild(button);
            });

            updateProgressBar();
        } else {
            // 모든 문제 완료
            showResult();
        }
    }

    // 선택지 선택
    function selectOption(selectedButton, presidentId) {
        // 모든 선택지 클릭 방지
        Array.from(optionsContainer.children).forEach(button => {
            button.disabled = true;
            button.classList.remove('selected'); // 혹시 모를 이전 선택 상태 제거
        });

        // 선택된 버튼에 selected 클래스 추가 (색상 변경)
        selectedButton.classList.add('selected');

        // 점수 기록
        scores[presidentId]++;

        // 잠시 후 다음 문제 로드 또는 결과 화면으로 이동
        setTimeout(() => {
            currentQuestionIndex++;
            loadQuestion();
        }, 500); // 0.5초 후 다음 문제 로드
    }

    // 진행 바 업데이트
    function updateProgressBar() {
        const progress = ((currentQuestionIndex) / totalQuestions) * 100;
        progressBar.style.width = `${progress}%`;
    }

    // 결과 화면 표시
    function showResult() {
        showScreen(resultScreen);

        let maxScore = -1;
        let mostSimilarPresidentId = '';

        // 가장 높은 점수를 받은 대통령 찾기
        for (const presidentId in scores) {
            if (scores[presidentId] > maxScore) {
                maxScore = scores[presidentId];
                mostSimilarPresidentId = presidentId;
            } else if (scores[presidentId] === maxScore) {
                // 동점일 경우, 첫 번째로 발견된 대통령으로 일단 설정 (랜덤성 추가 필요 시 로직 변경)
                // 현재는 무작위성을 부여하지 않고 그대로 둠
            }
        }

        const mostSimilarPresident = presidentsInfo[mostSimilarPresidentId];
        resultPresidentPhoto.src = mostSimilarPresident.photo;
        resultPresidentPhoto.alt = mostSimilarPresident.name;
        resultPresidentName.textContent = mostSimilarPresident.name;

        // 일치 응답률 계산: (획득 점수 / 총 질문 수) * 100
        const matchRate = ((maxScore / totalQuestions) * 100).toFixed(1);
        resultMatchRate.textContent = `당신은 ${mostSimilarPresident.name}와(과) ${matchRate}% 일치합니다!`;

        // 다른 대통령 결과 표시
        otherPresidentsList.innerHTML = ''; // 기존 내용 삭제
        const sortedPresidents = Object.keys(scores).sort((a, b) => scores[b] - scores[a]); // 점수 높은 순 정렬

        sortedPresidents.forEach(presidentId => {
            if (presidentId === mostSimilarPresidentId) return; // 가장 비슷한 대통령은 제외

            const presidentData = presidentsInfo[presidentId];
            const otherScore = scores[presidentId];
            const otherMatchRate = ((otherScore / totalQuestions) * 100).toFixed(1);

            const item = document.createElement('div');
            item.classList.add('other-president-item');
            item.innerHTML = `
                <img src="${presidentData.photo}" alt="${presidentData.name}">
                <p>${presidentData.name}</p>
                <span>일치율: ${otherMatchRate}%</span>
            `;
            otherPresidentsList.appendChild(item);
        });
    }

    // 초기 화면 설정 로직 삭제: HTML에 .active 클래스가 이미 있으므로 스크립트에서 초기 설정을 할 필요 없음.
    // showScreen(startScreen); // 이 줄을 제거했습니다.
});
