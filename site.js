// Games of Forge : comportements de la page. Aucun framework, aucune dependance.
(function () {
  // La barre de navigation se densifie des qu'on quitte le haut de page.
  var nav = document.querySelector('.nav');
  if (nav) {
    var majBarre = function () { nav.classList.toggle('dense', window.scrollY > 24); };
    majBarre();
    window.addEventListener('scroll', majBarre, { passive: true });
  }

  // Apparition douce des blocs au defilement (desactivee si l'utilisateur reduit les animations).
  var doux = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var cibles = document.querySelectorAll('.apparait');
  if (doux || !('IntersectionObserver' in window)) {
    for (var i = 0; i < cibles.length; i++) cibles[i].classList.add('vu');
  } else {
    var obs = new IntersectionObserver(function (entrees) {
      entrees.forEach(function (e) {
        if (!e.isIntersecting) return;
        var delai = parseInt(e.target.getAttribute('data-delai') || '0', 10);
        setTimeout(function () { e.target.classList.add('vu'); }, delai);
        obs.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });
    for (var j = 0; j < cibles.length; j++) obs.observe(cibles[j]);
  }

  // Un choix de langue explicite est memorise : la redirection automatique ne s'impose plus ensuite.
  var boutons = document.querySelectorAll('[data-langue]');
  for (var k = 0; k < boutons.length; k++) {
    boutons[k].addEventListener('click', function () {
      try { localStorage.setItem('gof-langue', this.getAttribute('data-langue') || ''); } catch (e) {}
    });
  }
})();
