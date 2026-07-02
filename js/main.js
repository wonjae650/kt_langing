// ===== FAQ data =====
const faqItems = [
  "지원 대상은 어떻게 되나요?",
  "교육 일정은 어떻게 되나요?",
  "지원 프로세스는 어떻게 진행되나요?",
  "지원 접수 확인은 어떻게 하나요?",
  "지원서 수정이 가능한가요?",
  "고용24 수강 신청 확인은 어떻게 하나요?",
  "선발 기준이 있나요?",
  "면접은 어떻게 진행되나요?",
  "고등학생, 비전공자, 재직자, 해외거주자도 관련 지원이 가능한가요?",
  "K-디지털 트레이닝 과정 중 수료 취소나 환불이 가능한가요?",
  "국비지원과정과의 병행이 가능한가요?",
  "다른 지역도 전형 모집이 있나요?",
  "다른 기수는 언제 모집하나요?"
];

const faqAnswers = [
  "디자인 시장 진입을 희망하는 예비 취업준비생, 재직자 누구나 지원 가능합니다.",
  "지원은 26.4.9(목)부터 26.5.25(월)까지이며, 교육은 26.6.10(수)부터 26.12.23(수)까지 진행됩니다.",
  "Portfolio Battle 전형과 Hidden Gem 전형 중 선택하여 지원서와 포트폴리오를 제출하시면 됩니다.",
  "지원 완료 시 등록하신 이메일과 문자로 접수 확인 안내가 발송됩니다.",
  "지원 마감 전까지는 마이페이지에서 지원서 수정이 가능합니다.",
  "고용24 홈페이지의 나의 훈련 내역에서 수강 신청 여부를 확인하실 수 있습니다.",
  "제출하신 포트폴리오와 지원서를 기준으로 종합적으로 평가하여 선발합니다.",
  "그룹 면접 형태로 진행되며, 협업 태도와 문제 해결 과정을 중점적으로 확인합니다.",
  "네, 전공과 재직 여부에 관계없이 누구나 지원하실 수 있습니다.",
  "관련 규정에 따라 정해진 기간 내 취소 및 환불 신청이 가능합니다.",
  "동시에 참여 중인 국비지원과정이 있다면 중복 참여가 제한될 수 있으니 사전 문의 바랍니다.",
  "현재는 전국 단위 온라인 비대면 과정으로 지역 제한 없이 지원 가능합니다.",
  "다음 기수 모집 일정은 홈페이지 공지사항을 통해 안내될 예정입니다."
];

function buildFAQ() {
  const list = document.getElementById('faqList');
  if (!list) return;
  list.innerHTML = faqItems.map((q, i) => `
    <div class="faq-item">
      <button class="faq-item__trigger" aria-expanded="false">
        <span>${q}</span>
        <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
      <div class="faq-item__panel">
        <p>${faqAnswers[i]}</p>
      </div>
    </div>
  `).join('');

  list.querySelectorAll('.faq-item__trigger').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', isOpen);
    });
  });
}

// ===== Curriculum accordion =====
function bindAccordion(containerId, singleOpen = true) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const items = container.querySelectorAll('.accordion__item');
  items.forEach(item => {
    const trigger = item.querySelector('.accordion__trigger');
    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');
      if (singleOpen) {
        items.forEach(i => i.classList.remove('is-open'));
      }
      item.classList.toggle('is-open', !isOpen);
    });
  });
}

// ===== Apply-type tabs =====
function bindTabs() {
  const pills = document.querySelectorAll('.apply-type__tabs .pill');
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => {
        p.classList.remove('pill--active');
        p.setAttribute('aria-selected', 'false');
      });
      pill.classList.add('pill--active');
      pill.setAttribute('aria-selected', 'true');

      const targetId = pill.getAttribute('data-target');
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    });
  });
}

// ===== Mobile menu =====
function bindMobileMenu() {
  const toggle = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');
  if (!toggle || !nav) return;
  toggle.addEventListener('click', () => {
    nav.classList.toggle('is-open');
    toggle.classList.toggle('is-open');
  });
  nav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      nav.classList.remove('is-open');
      toggle.classList.remove('is-open');
    });
  });
}

// ===== Header scroll shadow =====
function bindHeaderScroll() {
  const header = document.getElementById('header');
  if (!header) return;
  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ===== FAQ toggle-all =====
function bindFaqToggleAll() {
  const btn = document.getElementById('faqToggleAll');
  const list = document.getElementById('faqList');
  if (!btn || !list) return;
  btn.addEventListener('click', () => {
    const items = list.querySelectorAll('.faq-item');
    const anyOpen = list.querySelector('.faq-item.is-open');
    items.forEach(item => {
      item.classList.toggle('is-open', !anyOpen);
      item.querySelector('.faq-item__trigger').setAttribute('aria-expanded', !anyOpen);
    });
    btn.classList.toggle('is-flipped', !anyOpen);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  buildFAQ();
  bindAccordion('curriculumAccordion', true);
  bindTabs();
  bindMobileMenu();
  bindHeaderScroll();
  bindFaqToggleAll();
});
