document.addEventListener('DOMContentLoaded', function() {
    // 모바일 메뉴 토글
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // 구독 폼 제출 처리
    const subscribeForm = document.getElementById('subscribeForm');
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const name = document.getElementById('name').value;
            const interests = Array.from(document.querySelectorAll('input[name="interests"]:checked'))
                .map(checkbox => checkbox.value);

            // 여기서 실제로는 서버로 데이터를 전송하지만,
            // 현재는 프론트엔드만 구현하므로 알림만 표시
            alert(`구독해 주셔서 감사합니다!\n이름: ${name}\n이메일: ${email}\n관심 분야: ${interests.join(', ')}`);
            subscribeForm.reset();
        });
    }

    // 명상 카드 모달 제어
    const headspaceCards = document.querySelectorAll('.headspace-card');
    const modals = document.querySelectorAll('.modal-overlay');

    headspaceCards.forEach(card => {
        card.addEventListener('click', function() {
            const modalId = 'modal-' + card.dataset.modal;
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.add('active');
                modal.focus();
            }
        });
    });

    modals.forEach(modal => {
        // 닫기 버튼
        modal.querySelector('.modal-close').addEventListener('click', () => {
            modal.classList.remove('active');
            // 모달 내 오디오 정지
            const audio = modal.querySelector('audio');
            if(audio) {
                audio.pause();
                audio.currentTime = 0;
            }
        });
        // 모달 내 종료/닫기 버튼
        modal.querySelectorAll('.modal-exit').forEach(btn => {
            btn.addEventListener('click', () => {
                modal.classList.remove('active');
                // 모달 내 오디오 정지
                const audio = modal.querySelector('audio');
                if(audio) {
                    audio.pause();
                    audio.currentTime = 0;
                }
            });
        });
        // 오버레이 클릭 시 닫기
        modal.addEventListener('mousedown', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                // 모달 내 오디오 정지
                const audio = modal.querySelector('audio');
                if(audio) {
                    audio.pause();
                    audio.currentTime = 0;
                }
            }
        });
    });
    // ESC로 닫기
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modals.forEach(modal => modal.classList.remove('active'));
        }
    });

    // 드롭다운 메뉴 모바일 클릭 제어
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(drop => {
        const toggle = drop.querySelector('.dropdown-toggle');
        if (toggle) {
            toggle.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    drop.classList.toggle('active');
                }
            });
        }
    });

    // 행사 카드 클릭 시 상세/신청 모달 열기
    const eventCards = document.querySelectorAll('.event-card[data-modal]');
    eventCards.forEach(card => {
        card.addEventListener('click', function() {
            const modalId = 'modal-' + card.dataset.modal;
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.add('active');
                modal.focus();
            }
        });
    });

    // 행사 신청 폼 제출 시 알림 및 닫기
    document.querySelectorAll('.event-form').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('신청이 완료되었습니다!');
            // 모달 닫기
            form.closest('.modal-overlay').classList.remove('active');
            form.reset();
        });
    });

    // 아침 명상 카드 클릭 시 오디오 재생
    const cardMorning = document.getElementById('card-morning');
    const audioMorning = document.getElementById('audio-morning');
    if(cardMorning && audioMorning) {
        cardMorning.addEventListener('click', function(e) {
            // 오디오 컨트롤 클릭 시에는 중복 재생 방지
            if(e.target.tagName.toLowerCase() === 'audio' || e.target.closest('audio')) return;
            audioMorning.currentTime = 0;
            audioMorning.play();
        });
    }
}); 