document.addEventListener('DOMContentLoaded', () => {
    const startScreen = document.getElementById('start-screen');
    const quizScreen = document.getElementById('quiz-screen');
    const resultScreen = document.getElementById('result-screen');
    const startButton = document.getElementById('start-button');
    const questionNumberElement = document.getElementById('question-number');
    const questionTextElement = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const resultPresidentPhoto = document.getElementById('result-president-photo');
    const resultPresidentName = document.getElementById('result-president-name');
    const resultMatchRate = document.getElementById('result-match-rate');
    const otherPresidentsList = document.getElementById('other-presidents-list');


    const modal = document.createElement('div');
    modal.id = 'president-modal';
    modal.classList.add('modal');
    modal.innerHTML = `
        <span class="close-button">&times;</span>
        <img class="modal-content" id="modal-president-photo">
    `;
    document.body.appendChild(modal);

    const modalPresidentPhoto = document.getElementById('modal-president-photo');
    const closeButton = document.querySelector('.close-button');

    // 모달 닫기 이벤트 리스너
    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // 모달 외부 클릭 시 닫기
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    let currentQuestionIndex = 0;
    let scores = {
        ardern: 0,
        biden: 0,
        macron: 0,
        bolsonaro: 0,
        xi: 0
    };
    const totalQuestions = quizQuestions.length;

    // 화면 전환 함수
    function showScreen(screenToShow) {
        [startScreen, quizScreen, resultScreen].forEach(screen => screen.classList.remove('active'));
        screenToShow.classList.add('active');
    }

    // 퀴즈 시작 버튼 클릭 이벤트 리스너
    startButton.addEventListener('click', () => {
        currentQuestionIndex = 0;
        // 점수 초기화
        for (let president in scores) {
            scores[president] = 0;
        }
        showScreen(quizScreen); 
        loadQuestion();
    });

    // 질문 로드 함수
    function loadQuestion() {
        if (currentQuestionIndex < totalQuestions) {
            const questionData = quizQuestions[currentQuestionIndex];
            questionNumberElement.textContent = `Q${currentQuestionIndex + 1}.`;
            questionTextElement.textContent = questionData.question;
            optionsContainer.innerHTML = '';

            questionData.options.forEach((option, index) => {
                const button = document.createElement('button');
                button.classList.add('option-button');
                button.textContent = option.text;
                button.dataset.president = option.president; 

                button.addEventListener('click', () => selectOption(button, option.president));

                optionsContainer.appendChild(button);
            });

        } else {
            // 모든 문제 완료 시 결과 화면 표시
            showResult();
        }
    }

    // 선택지 선택 함수
    function selectOption(selectedButton, presidentId) {
        // 모든 선택지 클릭 방지 및 이전 선택 상태 제거
        Array.from(optionsContainer.children).forEach(button => {
            button.disabled = true; // 선택지 비활성화
            button.classList.remove('selected');
        });

        selectedButton.classList.add('selected');

        // 점수 기록
        scores[presidentId]++;

        setTimeout(() => {
            currentQuestionIndex++;
            loadQuestion();
        }, 500); // 0.5초 후 다음 문제 로드
    }

    // 결과 화면 표시 함수
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
                // 동점일 경우,  첫 번째 대통령으로 설정
    
            }
        }

        const mostSimilarPresident = presidentsInfo[mostSimilarPresidentId];
        resultPresidentPhoto.src = mostSimilarPresident.photo; // 원 모양 사진
        resultPresidentPhoto.alt = mostSimilarPresident.name;
        resultPresidentName.textContent = mostSimilarPresident.name;

 
        resultPresidentPhoto.removeEventListener('click', showPresidentPoster);
        resultPresidentPhoto.addEventListener('click', showPresidentPoster);

        function showPresidentPoster() {
            modal.style.display = 'flex'; 
            modalPresidentPhoto.src = mostSimilarPresident.poster ? mostSimilarPresident.poster : mostSimilarPresident.photo;
            modalPresidentPhoto.alt = mostSimilarPresident.name;
        }

        // 일치 응답률 계산 및 표시
        const matchRate = ((maxScore / totalQuestions) * 100).toFixed(1);
        resultMatchRate.textContent = `당신은 ${mostSimilarPresident.name}와(과) ${matchRate}% 일치합니다!`;

        // 다른 대통령 결과 표시
        otherPresidentsList.innerHTML = ''; 
        const sortedPresidents = Object.keys(scores).sort((a, b) => scores[b] - scores[a]); // 점수 높은 순 정렬

        sortedPresidents.forEach(presidentId => {
            if (presidentId === mostSimilarPresidentId) return; 

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
});
