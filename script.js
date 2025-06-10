const quizQuestions = [
    {
        question: "시민들이 기후 정책에 반발하거나 시위할 경우, 정부의 태도는?",
        options: [
            { text: "시민의 의견을 존중하며 정책 방향과 방법을 함께 조율한다.", president: "ardern" },
            { text: "시위의 원인을 파악해 보완하되 정책 기조는 유지한다.", president: "macron" },
            { text: "정책 추진은 계속하되, 반발을 줄이는 보완책 병행한다.", president: "biden" },
            { text: "국가 목표 우선, 시위는 관리하되 통제한다.", president: "xi" },
            { text: "강경 대응, 정책에 방해가 되면 탄압까지도 정당하다.", president: "bolsonaro" }
        ]
    },
    {
        question: "탄소배출이 많은 산업 규제를 어떻게 실시할까?",
        options: [
            { text: "협의를 통해 규제에 대한 사회적 합의를 도출한다.", president: "ardern" },
            { text: "규제라는 목표는 유지하되, 산업 부담은 탄소세 조정, 보조금으로 완화한다.", president: "macron" },
            { text: "기술 투자와 세제 혜택을 통해 산업 전환을 유도한다.", president: "biden" },
            { text: "국영기업을 포함해 규제를 정부가 일방적으로 강제한다.", president: "xi" },
            { text: "규제는 산업 성장을 방해할 수 있어 최대한 자율로 둔다.", president: "bolsonaro" }
        ]
    },
    {
        question: "자동차 정책을 바꾸려면?",
        options: [
            { text: "시민과 논의하여 지역별 맞춤 제한 조치를 도입한다.", president: "ardern" },
            { text: "유류세 조정과 전기차 보급 확대 병행한다.", president: "macron" },
            { text: "전기차 인프라 확대하며 점진적 전환을 추진한다.", president: "biden" },
            { text: "대도시는 차량 제한 구역 지정해 빠르게 실행한다.", president: "xi" },
            { text: "최소 규제, 산업·소비자 자유 우선이다.", president: "bolsonaro" }
        ]
    },
    {
        question: "산불·폭염 같은 기후 재난 대응 방법은?",
        options: [
            { text: "주민이 주도하여 복구하는 프로그램을 운영한다.", president: "ardern" },
            { text: "피해지역에 재정 지원을 늘리고 보상 체계 구축한다.", president: "macron" },
            { text: "기후 복원 인프라에 집중 투자할 전략을 세운다.", president: "biden" },
            { text: "중앙 정부 주도 시스템으로 지역을 일괄 관리한다.", president: "xi" },
            { text: "경제 복구를 우선시함으로써 재난을 대응한다.", president: "bolsonaro" }
        ]
    },
    {
        question: "온실가스 감축 반발 대응은?",
        options: [
            { text: "산업·시민·환경단체 등과 함께 협의회를 구성한다.", president: "ardern" },
            { text: "목표는 유지하고 산업 지원책도 병행 시행한다.", president: "macron" },
            { text: "녹색 기술 개발에 예산 집중하여 정책 저항을 완화한다.", president: "biden" },
            { text: "국영기업에까지 감축 의무를 부과하고 단호히 시행한다.", president: "xi" },
            { text: "산업 위축 우려 시 정책 재검토도 고려한다.", president: "bolsonaro" }
        ]
    },
    {
        question: "기후위기 교육 확대 시 어떤 정책을 활용할 것인가?",
        options: [
            { text: "학생이 직접 참여할 수 있는 기후 교육을 운영한다.", president: "ardern" },
            { text: "산업·환경을 연계한 실용 교육 중심으로 개편한다.", president: "macron" },
            { text: "녹색 일자리 기반 STEM 교육을 확충한다.", president: "biden" },
            { text: "국가가 중심이 되는 환경교육 체계로 통일 적용한다.", president: "xi" },
            { text: "학교의 자율에 맡기고 의무화는 지양한다.", president: "bolsonaro" }
        ]
    },
    {
        question: "재생에너지시설 건설에 대한 반응을 어떻게 할 것인가?",
        options: [
            { text: "주민 협의로 입지 결정, 동의를 우선한다.", president: "ardern" },
            { text: "인센티브 및 지역 개발 혜택을 함께 제공한다.", president: "macron" },
            { text: "지역경제와 연계된 그린 인프라를 추진한다.", president: "biden" },
            { text: "중앙정부에 의해 입지를 강제할 수 있다.", president: "xi" },
            { text: "반대 시 제외, 대체 방안 모색한다.", president: "bolsonaro" }
        ]
    },
    {
        question: "기후 불평등을 완화할 수 있는 방안은?",
        options: [
            { text: "원주민·취약계층 중심의 맞춤형 지원 정책을 시행한다.", president: "ardern" },
            { text: "차등 보조금+에너지 복지를 강화한다.", president: "macron" },
            { text: "녹색 일자리·인프라로 지역 불평등 개선을 지원한다.", president: "biden" },
            { text: "중앙을 기준으로 균형 맞춰 지역 격차를 줄인다.", president: "xi" },
            { text: "국제시장에 맡겨 불평등을 해결한다.", president: "bolsonaro" }
        ]
    },
    {
        question: "탄소세 도입 방식은?",
        options: [
            { text: "공개토론을 거쳐 사회적 합의를 통해 도입한다.", president: "ardern" },
            { text: "일부 환급을 포함해 점진적으로 적용한다.", president: "macron" },
            { text: "세금수익을 청정에너지에 재투자한다.", president: "biden" },
            { text: "정부가 세율을 정해 강제 시행한다.", president: "xi" },
            { text: "경제부담이 되기때문에 도입하지 않는다.", president: "bolsonaro" }
        ]
    },
    {
        question: "국제 기후회의에서의 정부 역할은?",
        options: [
            { text: "시민 대표와 동행하며 공동 발언을 한다.", president: "ardern" },
            { text: "EU 등 협력 내에서 현실적 합의 도출을 목표로 한다.", president: "macron" },
            { text: "자국 산업의 경쟁력을 고려하며 선도국 이미지를 강조한다.", president: "biden" },
            { text: "개발도상국의 입장을 강조하며 자국 요구를 강하게 주장한다.", president: "xi" },
            { text: "주권과 경제 보호가능성이 떨어지므로 협력은 최소화한다.", president: "bolsonaro" }
        ]
    }
];

const presidentsInfo = {
    ardern: { name: "저신다 아던", photo: "images/저신다 아던.jpg" }, // 파일명 매칭
    biden: { name: "조 바이든", photo: "images/바이든.jpg" },
    macron: { name: "에마뉘엘 마크롱", photo: "images/마크롱.jpg" },
    bolsonaro: { name: "자이르 보우소나루", photo: "images/자이르.jpg" },
    xi: { name: "시진핑", photo: "images/시진핑.jpg" }
};
