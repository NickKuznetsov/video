// Обработка загрузки DOM
function t_ready(e) {
  "loading" != document.readyState ? e() : document.addEventListener ? document.addEventListener("DOMContentLoaded", e) : document.attachEvent("onreadystatechange", function () {
    "loading" != document.readyState && e()
  });
}

t_ready(function () {
  const cardsSettings = JSON.parse('[{"frontSideClass":"front","backSideClass":"back"},{"frontSideClass":"front2","backSideClass":"back2"},{"frontSideClass":"front3","backSideClass":"back3"},{"frontSideClass":"front4","backSideClass":"back4"},{"frontSideClass":"front5","backSideClass":"back5"},{"frontSideClass":"front6","backSideClass":"back6"},{"frontSideClass":"front7","backSideClass":"back7"},{"frontSideClass":"front8","backSideClass":"back8"},{"frontSideClass":"front9","backSideClass":"back9"}]');
  setTimeout(() => {
    const style = document.createElement('style');
    style.type = 'text/css';
    let innerHTMLForStyle = ' .tn-group>.tn-molecule.nolim185cardsmod { transform: perspective(1500px) rotateY(180deg)!important; } ';

    const isTouchOnlyDevice = ('maxTouchPoints' in navigator && navigator.maxTouchPoints > 0 && matchMedia('(pointer: coarse)').matches && !matchMedia('(hover: hover)').matches);

    cardsSettings.forEach((cardSettings) => {
      innerHTMLForStyle += `
        .${cardSettings.frontSideClass}, .${cardSettings.backSideClass} {
          cursor: pointer !important;
          perspective: 1500px;
          transform-style: preserve-3d;
          background: transparent !important;
          position: relative;
        }
        .${cardSettings.frontSideClass} .tn-molecule {
          transition: transform 1200ms cubic-bezier(.34,1.56,.64,1);
          backface-visibility: hidden;
          transform:initial!important;
          transform-style: preserve-3d;
          will-change: transform, opacity;
          transform: rotateY(0deg);
        }
        .${cardSettings.backSideClass} .tn-molecule{
          transform: perspective(1500px) rotateY(-180deg)!important;
          transition: transform 1200ms cubic-bezier(.34,1.56,.64,1);
          backface-visibility: hidden;
          transform-style: preserve-3d;
          will-change: transform;
        }
        .${cardSettings.backSideClass}:has(.activebaby){
          z-index:9998!important;
        }
        .${cardSettings.backSideClass}>.activebaby:not(.bla) {
          transform: perspective(1500px) rotateY(0deg)!important;
        }`;

      if (window.isSafari) {
        innerHTMLForStyle += `
          .${cardSettings.frontSideClass} .tn-molecule {
            contain: strict;
          }`;
      }

      function handleMouseEnter() {
        $(`.${cardSettings.frontSideClass}`).children('.tn-molecule').addClass('nolim185cardsmod');
        $(`.${cardSettings.backSideClass}`).children('.tn-molecule').addClass('activebaby');
      }

      function handleMouseLeave() {
        $(`.${cardSettings.frontSideClass}`).children('.tn-molecule').removeClass('nolim185cardsmod');
        $(`.${cardSettings.backSideClass}`).children('.tn-molecule').removeClass('activebaby');
      }

      function prepareCard($elem) {
        const styles = {
          'will-change': 'transform, opacity',
          'transform': 'rotateY(0deg)',
          'backface-visibility': 'hidden',
          'transform-style': 'preserve-3d'
        };
        if (window.isSafari) styles.contain = 'strict';
        $elem.css(styles);
      }

      const intForFrontSideElem = setInterval(() => {
        const frontSideElem = $(`.${cardSettings.frontSideClass}`);
        const backSideElem = $(`.${cardSettings.backSideClass}`);
        if (!frontSideElem.length || !backSideElem.length) return;
        clearInterval(intForFrontSideElem);

        frontSideElem.children('.tn-molecule').each(function () { prepareCard($(this)); });
        backSideElem.children('.tn-molecule').each(function () { prepareCard($(this)); });

        backSideElem.each(function () {
          isTouchOnlyDevice ? $(this).on('click', handleMouseLeave) : $(this).on('mouseleave', handleMouseLeave);
        });

        frontSideElem.each(function () {
          isTouchOnlyDevice ? $(this).on('click', handleMouseEnter) : $(this).on('mouseenter', handleMouseEnter);
        });
      }, 100);

      setTimeout(() => { clearInterval(intForFrontSideElem); }, 7000);
    });

    style.innerHTML = innerHTMLForStyle;
    document.head.appendChild(style);

    setTimeout(() => {
      const styleForLoading = document.querySelector('.nlm185-css-for-loading');
      if (styleForLoading) styleForLoading.remove();
    }, 300);

    setTimeout(() => { window.scrollBy(0, 1); }, 300);
  });
});

// Обновление анимации keyframes
var animEasingCheck = setInterval(function () {
  if ($(".sbs-anim-keyframes").length == 1) {
    var css = $(".sbs-anim-keyframes").html().replaceAll("linear", "cubic-bezier(0.34, 1, 0.68, 1)");
    $(".sbs-anim-keyframes").text("");
    setTimeout(function () {
      $(".sbs-anim-keyframes").text(css);
    });
    clearInterval(animEasingCheck);
  }
}, 200);

// Переключение блоков по кликам
$(document).ready(function () {
  $('[href="#name1"]').click(function () {
    $('#rec781043790').slideToggle(500); t_lazyload_update();
  });
  $('[href="#name2"]').click(function () {
    $('#rec646269336, #rec646278424').slideUp(500);
    $('#rec646267041').slideToggle(500);
    t_lazyload_update();
  });
  $('[href="#name3"]').click(function () {
    $('#rec646267041, #rec646278424').slideUp(500);
    $('#rec646269336').slideToggle(500);
    t_lazyload_update();
  });
  $('[href="#name4"]').click(function () {
    $('#rec646267041, #rec646269336').slideUp(500);
    $('#rec646278424').slideToggle(500);
    t_lazyload_update();
  });
});

// Отзывы: переключение активной карточки
const testimonialCardsContainer = document.getElementById('testimonialCardsContainer');
const dotsContainer = document.getElementById('dotsContainer');
const testimonialCards = Array.from(testimonialCardsContainer.children);
let currentIndex = 0;

testimonialCards.forEach((_, i) => {
  const dot = document.createElement('span');
  dot.classList.add('dot');
  if (i === 0) dot.classList.add('active');
  dot.addEventListener('click', () => {
    goToIndex(i);
    resetInterval();
  });
  dotsContainer.appendChild(dot);
});

function goToIndex(index) {
  if (index < 0) index = testimonialCards.length - 1;
  if (index >= testimonialCards.length) index = 0;
  currentIndex = index;

  const card = testimonialCards[currentIndex];
  const containerCenter = testimonialCardsContainer.offsetWidth / 2;
  const scrollLeft = card.offsetLeft + card.offsetWidth / 2 - containerCenter;

  testimonialCardsContainer.scrollTo({ left: scrollLeft, behavior: 'smooth' });

  updateActiveCard();
  updateDots();
}

function updateActiveCard() {
  testimonialCards.forEach((card, i) => {
    card.classList.toggle('active', i === currentIndex);
  });
}

function updateDots() {
  const dots = dotsContainer.children;
  Array.from(dots).forEach((dot, i) => {
    dot.classList.toggle('active', i === currentIndex);
  });
}

let interval = setInterval(() => {
  goToIndex(currentIndex + 1);
}, 4000);

function resetInterval() {
  clearInterval(interval);
  interval = setInterval(() => {
    goToIndex(currentIndex + 1);
  }, 4000);
}

testimonialCards.forEach((card, i) => {
  card.addEventListener('click', () => {
    goToIndex(i);
    resetInterval();
  });
});

testimonialCardsContainer.addEventListener('scroll', () => {
  const containerCenter = testimonialCardsContainer.scrollLeft + testimonialCardsContainer.offsetWidth / 2;
  let closestIndex = 0;
  let closestDistance = Infinity;

  testimonialCards.forEach((card, index) => {
    const cardCenter = card.offsetLeft + card.offsetWidth / 2;
    const distance = Math.abs(containerCenter - cardCenter);
    if (distance < closestDistance) {
      closestDistance = distance;
      closestIndex = index;
    }
  });

  if (closestIndex !== currentIndex) {
    currentIndex = closestIndex;
    updateActiveCard();
    updateDots();
  }
});

goToIndex(0);

document.addEventListener("DOMContentLoaded", function () {
  const idsToHide = [
    'rec781043790',
    'rec646267041',
    'rec646269336',
    'rec646278424'
  ];
  idsToHide.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });
});
