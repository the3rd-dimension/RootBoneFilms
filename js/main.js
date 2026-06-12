document.addEventListener('DOMContentLoaded',function(){
  // year in footer
  const y=new Date().getFullYear();
  const els=[document.getElementById('year'),document.getElementById('year-p'),document.getElementById('year-c')];
  els.forEach(e=>{if(e)e.textContent=y});

  // mobile nav toggle
  const toggle=document.querySelector('.nav-toggle');
  const nav=document.querySelector('.site-nav');
  if(toggle){toggle.addEventListener('click',()=>{
    if(nav.style.display==='flex')nav.style.display='none';else nav.style.display='flex';
  })}

  // contact form handler using Formspree
  const form=document.getElementById('contactForm');
  if(form){form.addEventListener('submit',async function(e){
    e.preventDefault();
    const msg=document.getElementById('contactMsg');
    msg.classList.remove('hidden');
    msg.textContent='Sending...';

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: new FormData(form),
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        msg.textContent='Thanks — your message has been sent!';
        form.reset();
      } else {
        const result = await response.json();
        msg.textContent = result?.error || 'Oops, there was a problem sending your message. Please try again.';
      }
    } catch (error) {
      msg.textContent='Network error — please try again.';
    }
  })}
});
