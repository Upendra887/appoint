let screens = [...document.querySelectorAll('.screen')];
const phoneInput = document.querySelector('#phone');
const otpInputs = [...document.querySelectorAll('.otp-row input')];
let countdown = 42;
let countdownTimer;
let appointment = JSON.parse(localStorage.getItem('aarogya-appointment') || 'null');
const hospitals = [
  ['KIMS Saveera Multispeciality Hospital', 'Rudrampeta, Anantapur', '1.8 km', '4.7', '1,240'],
  ['Government General Hospital', 'Srinivasa Nagar, Anantapur', '2.4 km', '4.3', '860'],
  ['Medisense Super Speciality Hospital', 'Ramnagar, Anantapur', '3.1 km', '4.6', '512'],
  ['RDT Hospital & Research Centre', 'Bathalapalli, Anantapur', '5.8 km', '4.5', '390'],
  ['Sri Sai Multi Speciality Hospital', 'Kamalanagar, Anantapur', '2.9 km', '4.4', '274'],
  ['Apollo Pharmacy & Clinic', 'Old Town, Anantapur', '3.6 km', '4.2', '188'],
  ['Shree Hospitals', 'Aravind Nagar, Anantapur', '4.2 km', '4.6', '321'],
  ['Carewell Women & Children Hospital', 'Brahmana Palli, Anantapur', '4.9 km', '4.8', '207'],
  ['Vijaya Diagnostic Centre', 'Tadipatri Road, Anantapur', '6.3 km', '4.1', '145'],
  ['Narayana Health Clinic', 'Saptagiri Circle, Anantapur', '1.2 km', '4.5', '468']
];

const renderHospitals = () => {
  const firstHospital = document.querySelector('.hospital');
  if (!firstHospital) return;
  const list = document.createElement('div');
  list.className = 'hospital-list';
  firstHospital.parentElement.insertBefore(list, firstHospital);
  list.append(firstHospital);
  hospitals.slice(1).forEach(([name, address, distance, rating, reviews], index) => {
    const hospital = firstHospital.cloneNode(true);
    hospital.querySelector('.hospital-info h3').innerHTML = name.replace(' ', '<br> ');
    hospital.querySelector('.hospital-info p').textContent = address;
    hospital.querySelector('.distance').textContent = distance;
    hospital.querySelector('.hospital-foot span').innerHTML = `★ <b>${rating}</b> &nbsp; ${reviews} reviews`;
    hospital.querySelector('.hospital-photo').style.filter = `hue-rotate(${index * 17}deg)`;
    list.append(hospital);
  });
};
renderHospitals();

const utilityNav = (selected) => `<nav class="bottom-nav">${[['⌂', 'Home', 'home'], ['▣', 'Appointments', 'appointments'], ['♧', 'Emergency', 'emergency'], ['◉', 'Profile', 'profile']].map(([icon, label, screen]) => `<button class="${selected === screen ? 'selected' : ''}" data-go="${screen}"><span>${icon}</span>${label}</button>`).join('')}</nav>`;

const addUtilityScreens = () => {
  const phoneScreen = document.querySelector('.phone-screen');
  phoneScreen.insertAdjacentHTML('beforeend', `
    <section class="screen utility-screen" data-screen="appointments">
      <div class="utility-heading"><button class="back-btn" data-go="home">← <span>Back</span></button><span class="tiny-label">MY CARE</span></div>
      <div class="utility-title"><p class="kicker">YOUR HEALTH JOURNEY</p><h2>Appointments</h2><p>Keep track of upcoming visits and past care.</p></div>
      <div class="utility-card appointment-summary"><span class="utility-icon">▣</span><div><small>NEXT APPOINTMENT</small><h3>${appointment ? 'Dr. Suresh Kumar, MD' : 'No appointments yet'}</h3><p>${appointment ? 'Today, 10:30 AM · KIMS Saveera Hospital' : 'Book a doctor visit in a few simple steps.'}</p></div></div>
      <button class="primary-btn utility-action" data-go="${appointment ? 'pass' : 'doctor'}">${appointment ? 'View digital token pass' : 'Book an appointment'} <b>→</b></button>
      ${utilityNav('appointments')}
    </section>
    <section class="screen utility-screen" data-screen="emergency">
      <div class="utility-heading"><button class="back-btn" data-go="home">← <span>Back</span></button><span class="tiny-label">HELP NOW</span></div>
      <div class="emergency-hero"><div class="emergency-icon">+</div><p class="kicker">24 / 7 SUPPORT</p><h2>Emergency<br><em>Helpline</em></h2><p>Immediate medical assistance is available across Anantapur.</p></div>
      <a class="call-card" href="tel:108"><span>☎</span><div><small>AMBULANCE & EMERGENCY</small><strong>Call 108</strong><p>Government emergency response</p></div><b>→</b></a>
      <a class="call-card" href="tel:18001234567"><span>♧</span><div><small>AAROGYA SUPPORT</small><strong>1800-123-4567</strong><p>Appointments and patient support</p></div><b>→</b></a>
      <p class="emergency-note">If someone is in immediate danger, call 108 first. Stay with the patient and follow the operator's instructions.</p>
      ${utilityNav('emergency')}
    </section>
    <section class="screen utility-screen" data-screen="profile">
      <div class="utility-heading"><button class="back-btn" data-go="home">← <span>Back</span></button><span class="tiny-label">ACCOUNT</span></div>
      <div class="profile-hero"><div class="profile-avatar">R</div><p class="kicker">PATIENT PROFILE</p><h2>Ramesh Kumar</h2><p>+91 98765 43210</p></div>
      <div class="profile-list"><button><span>♙</span>Personal details <b>›</b></button><button><span>⌁</span>Language · English / తెలుగు <b>›</b></button><button><span>◉</span>Notifications <b>›</b></button><button><span>?</span>Help & support <b>›</b></button></div>
      <button class="outline-btn signout">Sign out</button>
      ${utilityNav('profile')}
    </section>`);
  screens = [...document.querySelectorAll('.screen')];
};
addUtilityScreens();

const showScreen = (name) => {
  screens.forEach((screen) => screen.classList.toggle('active', screen.dataset.screen === name));
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const toast = (message) => {
  let notice = document.querySelector('.toast');
  if (!notice) {
    notice = document.createElement('div');
    notice.className = 'toast';
    document.body.append(notice);
  }
  notice.textContent = message;
  notice.classList.add('visible');
  clearTimeout(notice.hideTimer);
  notice.hideTimer = setTimeout(() => notice.classList.remove('visible'), 2600);
};

const startCountdown = () => {
  clearInterval(countdownTimer);
  countdown = 42;
  const counter = document.querySelector('.resend b');
  countdownTimer = setInterval(() => {
    countdown -= 1;
    if (counter) counter.textContent = `00:${String(Math.max(countdown, 0)).padStart(2, '0')}`;
    if (countdown <= 0) clearInterval(countdownTimer);
  }, 1000);
};

const validPhone = () => phoneInput.value.replace(/\D/g, '').length === 10;
const validOtp = () => otpInputs.every((input) => /^\d$/.test(input.value));

document.addEventListener('click', (event) => {
  const trigger = event.target.closest('[data-go]');
  if (trigger) {
    if (trigger.dataset.go === 'otp' && !validPhone()) return toast('Enter a valid 10-digit mobile number.');
    if (trigger.dataset.go === 'home' && !validOtp()) return toast('Enter the 4-digit OTP to continue.');
    if (trigger.dataset.go === 'pass') {
      appointment = { reference: 'AAR-9842', date: document.querySelector('.date-tab.selected small').textContent, time: document.querySelector('.selected-slot').textContent.trim() };
      localStorage.setItem('aarogya-appointment', JSON.stringify(appointment));
      toast('Payment received. Your appointment is confirmed.');
    }
    showScreen(trigger.dataset.go);
    if (trigger.dataset.go === 'otp') startCountdown();
  }

  const slot = event.target.closest('.slot:not(.unavailable)');
  if (slot) {
    document.querySelectorAll('.selected-slot').forEach((item) => item.classList.remove('selected-slot'));
    slot.classList.add('selected-slot');
  }

  const date = event.target.closest('.date-tab');
  if (date) {
    document.querySelectorAll('.date-tab').forEach((item) => item.classList.remove('selected'));
    date.classList.add('selected');
    if (date.querySelector('small').textContent === 'CUSTOM DATE') toast('Custom date selection is ready for calendar integration.');
  }

  const specialty = event.target.closest('.specialty');
  if (specialty) {
    const search = document.querySelector('.search input');
    search.value = specialty.querySelector('b').textContent.replace(/\n/g, ' ');
    search.dispatchEvent(new Event('input', { bubbles: true }));
  }

  const bottomTab = event.target.closest('.bottom-nav button');
  if (bottomTab) {
    const tabs = [...document.querySelectorAll('.bottom-nav button')];
    tabs.forEach((tab) => tab.classList.toggle('selected', tab === bottomTab));
    const tabIndex = tabs.indexOf(bottomTab);
    if (tabIndex === 1) showScreen('appointments');
    if (tabIndex === 2) showScreen('emergency');
    if (tabIndex === 3) showScreen('profile');
  }

  if (event.target.closest('.text-btn')) {
    startCountdown();
    toast('A new OTP has been sent.');
  }

  if (event.target.closest('.hospital-foot button')) showScreen('doctor');
  if (event.target.closest('.token-body a')) window.open('https://maps.google.com/?q=KIMS+Saveera+Anantapur', '_blank');
  if (event.target.closest('.outline-btn')) {
    const message = 'Aarogya 24/7 appointment AAR-9842 with Dr. Suresh Kumar, Today at 10:30 AM.';
    if (navigator.share) navigator.share({ title: 'Aarogya 24/7 appointment', text: message });
    else navigator.clipboard?.writeText(message).then(() => toast('Appointment details copied to clipboard.'));
  }
  if (event.target.closest('.pass-actions .primary-btn')) toast('Show booking reference AAR-9842 at reception.');
  if (event.target.closest('.signout')) {
    localStorage.removeItem('aarogya-appointment');
    appointment = null;
    toast('You have been signed out.');
    showScreen('welcome');
  }
});

document.addEventListener('input', (event) => {
  if (event.target.matches('.otp-row input')) {
    event.target.value = event.target.value.replace(/\D/g, '').slice(-1);
    if (event.target.value && event.target.nextElementSibling) event.target.nextElementSibling.focus();
  }
  if (event.target.matches('.search input')) {
    const query = event.target.value.toLowerCase().trim();
    document.querySelectorAll('.specialty').forEach((item) => { item.hidden = query && !item.textContent.toLowerCase().includes(query); });
    document.querySelectorAll('.hospital').forEach((hospital) => {
      hospital.hidden = query && !hospital.textContent.toLowerCase().includes(query);
    });
  }
});
