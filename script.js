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

    // 새로운 요소 추가: 모달 관련 (script.js에서 동적으로 생성)
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

    // 화면 전환 함수: 모든 화면에서 'active' 클래스 제거 후, 보여줄 화면에 'active' 클래스 부여
    function showScreen(screenToShow) {
        const screens = [startScreen, quizScreen, resultScreen];
        screens.forEach(screen => {
            screen.classList.remove('active');
        });
        screenToShow.classList.add('active');
    }

    // 퀴즈 시작 버튼 클릭 이벤트 리스너
    startButton.addEventListener('click', () => {
        currentQuestionIndex = 0;
        // 점수 초기화
        for (let president in scores) {
            scores[president] = 0;
        }
        showScreen(quizScreen); // 퀴즈 화면으로 전환
        loadQuestion();
    });

    // 질문 로드 함수
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
            // 모든 문제 완료 시 결과 화면 표시
            showResult();
        }
    }

    // 선택지 선택 함수
    function selectOption(selectedButton, presidentId) {
        // 모든 선택지 클릭 방지 및 이전 선택 상태 제거
        Array.from(optionsContainer.children).forEach(button => {
            button.disabled = true; // 선택지 비활성화
            button.classList.remove('selected'); // 혹시 모를 이전 선택 상태 제거
        });

        // 선택된 버튼에 'selected' 클래스 추가 (클릭 모션 및 색상 변경)
        selectedButton.classList.add('selected');

        // 점수 기록
        scores[presidentId]++;

        // 잠시 후 다음 문제 로드 또는 결과 화면으로 이동
        setTimeout(() => {
            currentQuestionIndex++;
            loadQuestion();
        }, 500); // 0.5초 후 다음 문제 로드
    }

    // 진행 바 업데이트 함수
    function updateProgressBar() {
        const progress = ((currentQuestionIndex) / totalQuestions) * 100;
        progressBar.style.width = `${progress}%`;
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
                // 동점일 경우, 현재 로직에서는 첫 번째로 발견된 대통령으로 설정됩니다.
                // 랜덤성을 추가하려면 여기에 로직 변경이 필요합니다.
            }
        }

        const mostSimilarPresident = presidentsInfo[mostSimilarPresidentId];
        resultPresidentPhoto.src = mostSimilarPresident.photo; // 원 모양 사진
        resultPresidentPhoto.alt = mostSimilarPresident.name;
        resultPresidentName.textContent = mostSimilarPresident.name;

        // 결과 대통령 사진 클릭 이벤트 추가
        // 기존 리스너가 있다면 제거하여 중복 방지 (여러 번 showResult 호출될 경우)
        resultPresidentPhoto.removeEventListener('click', showPresidentPoster); 
        resultPresidentPhoto.addEventListener('click', showPresidentPoster);

        function showPresidentPoster() {
            modal.style.display = 'flex'; // flex로 설정하여 CSS의 justify-content, align-items 적용
            modalPresidentPhoto.src = mostSimilarPresident.poster; // 포스터 URL (만약 presidentsInfo에 poster 속성이 있다면)
            // 만약 presidentsInfo에 poster 속성이 없고 그냥 큰 사진이라면:
            // modalPresidentPhoto.src = mostSimilarPresident.photo; 
        }


        // 일치 응답률 계산 및 표시
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

    // HTML에 '.active' 클래스가 'start-screen'에 이미 적용되어 있으므로, 
    // DOMContentLoaded 시점에 스크립트에서 별도로 초기 화면을 설정할 필요가 없습니다.
    // showScreen(startScreen); // 이 줄은 의도적으로 제거되었습니다.
});
