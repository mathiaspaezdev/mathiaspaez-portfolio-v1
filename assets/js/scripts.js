/**
 * scripts.js - (c) MathiasPaez.com
 */

document.addEventListener('DOMContentLoaded', () => {

  // --- UTILIDADES ---
  const navLinks = document.querySelectorAll('.menu-link, .nav-links a, #navCollapse .nav-link');
  const sections = document.querySelectorAll('section[id]');
  const progressBars = document.querySelectorAll('.custom-progress .progress-bar');

  // OBTENER OFFSET PARA FIJAR NAVBAR A 130PX. SE SCROLLEA HACIA EL ELEMENTO MENOS ESTE OFFSET.
  const NAV_HEIGHT = 130;

  // SMOOTH SCROLL OVERRIDE PARA TODOS LOS LINKS INTERNOS
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href').slice(1);
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        e.preventDefault();
        // COMPUTO LA POSICION TOP MENOS ALTURA DEL NAVBAR
        const topPos = targetEl.getBoundingClientRect().top + window.pageYOffset - NAV_HEIGHT + 8;
        window.scrollTo({ top: topPos, behavior: 'smooth' });

        //SI ES COLAPSABLE (MOBILE), SE CIERRA (Bootstrap)
        const navCollapse = document.querySelector('.navbar-collapse');
        if (navCollapse && navCollapse.classList.contains('show')) {
          // USO EL COLLAPSE DE BOOTSTRAP
          const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
          if (bsCollapse) bsCollapse.hide();
          else navCollapse.classList.remove('show');
        }
      }
    });
  });

  // HIGHLIGHT EN LINKS ACTIVOS EN SCROLL
  function onScroll() {
    const scrollPos = window.pageYOffset + NAV_HEIGHT + 20; // small margin
    sections.forEach(sec => {
      const top = sec.offsetTop;
      const bottom = top + sec.offsetHeight;
      const id = sec.getAttribute('id');
      const link = document.querySelector(`a[href="#${id}"]`);
      if (scrollPos >= top && scrollPos < bottom) {
        if (link) link.classList.add('active');
      } else {
        if (link) link.classList.remove('active');
      }
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  //ANIMA LA BARRA DE PROGRESO CUANDO INGRESA LA SECCION
  function animateProgressBarsIfNeeded() {
    const doingSection = document.getElementById('doing');
    if (!doingSection) return;

    const rect = doingSection.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;

    if (inView) {
      //ANIMA CADA BARRA HASTA EL PORCENTAJE OBJETIVO
      const bars = doingSection.querySelectorAll('.progress-bar');
      bars.forEach(bar => {
        const target = bar.getAttribute('data-target') || bar.style.width || '0';
        // OBJETIVO MUESTRA NUMERO COMO STRING
        const percent = parseInt(target, 10);
        if (!isNaN(percent)) {
          bar.style.width = percent + '%';
        }
      });
      // CORRER POR UNICA VEZ.
      window.removeEventListener('scroll', animateProgressBarsIfNeeded);
    }
  }

  window.addEventListener('scroll', animateProgressBarsIfNeeded, { passive: true });
  // ANIMAR SI LA SECCION ESTA A LA VISTA
  animateProgressBarsIfNeeded();

});
