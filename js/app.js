function setTheme(t){
  document.documentElement.setAttribute('data-theme', t);
  document.getElementById('btn-light').classList.toggle('active', t==='light');
  document.getElementById('btn-dark').classList.toggle('active', t==='dark');
  localStorage.setItem('medsnapshot-theme', t);
}
const saved = localStorage.getItem('medsnapshot-theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
setTheme(saved);
document.getElementById('btn-light').onclick = () => setTheme('light');
document.getElementById('btn-dark').onclick = () => setTheme('dark');

const FORMSPREE_FORM_ID = 'xeajzlyr';

function handleWaitlist(e){
  e.preventDefault();
  const form = document.getElementById('wl-form');
  const errorEl = document.getElementById('wl-error');
  const button = form.querySelector('button[type="submit"]');
  errorEl.style.display = 'none';
  button.disabled = true;
  button.textContent = 'Joining…';

  fetch(`https://formspree.io/f/${FORMSPREE_FORM_ID}`, {
    method: 'POST',
    headers: { 'Accept': 'application/json' },
    body: new FormData(form),
  })
    .then((res) => {
      if (res.ok) {
        form.style.display = 'none';
        document.getElementById('wl-success').classList.add('show');
        return;
      }
      return res.json().then((data) => {
        const message = data?.errors?.map((err) => err.message).join(', ');
        throw new Error(message || 'Request failed');
      });
    })
    .catch((err) => {
      errorEl.textContent = err.message === 'Request failed'
        ? 'Something went wrong — please try again, or email us directly.'
        : err.message;
      errorEl.style.display = 'block';
      button.disabled = false;
      button.textContent = 'Join Waitlist';
    });

  return false;
}
