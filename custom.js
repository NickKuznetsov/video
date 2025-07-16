
// t_ready helper
function t_ready(callback) {
  if (document.readyState !== "loading") {
    callback();
  } else if (document.addEventListener) {
    document.addEventListener("DOMContentLoaded", callback);
  } else {
    document.attachEvent("onreadystatechange", function () {
      if (document.readyState !== "loading") callback();
    });
  }
}

t_ready(function () {
  // Toggle blocks by name click
  const toggleMap = {
    "#name1": ["rec781043790"],
    "#name2": ["rec646267041"],
    "#name3": ["rec646269336"],
    "#name4": ["rec646278424"]
  };

  Object.keys(toggleMap).forEach((key) => {
    document.querySelectorAll(`[href="${key}"]`).forEach((el) => {
      el.addEventListener("click", function (e) {
        e.preventDefault();
        const allBlocks = ["rec781043790", "rec646267041", "rec646269336", "rec646278424"];
        const targets = toggleMap[key];

        allBlocks.forEach((id) => {
          if (!targets.includes(id)) $(`#${id}`).slideUp(500);
        });

        targets.forEach((id) => {
          $(`#${id}`).slideToggle(500);
        });

        if (typeof t_lazyload_update === "function") t_lazyload_update();
      });
    });
  });

  // Replace easing in Tilda's auto animations
  const animEasingCheck = setInterval(function () {
    const el = document.querySelector(".sbs-anim-keyframes");
    if (el) {
      let css = el.innerHTML.replaceAll("linear", "cubic-bezier(0.34, 1, 0.68, 1)");
      el.textContent = "";
      setTimeout(() => {
        el.textContent = css;
      }, 0);
      clearInterval(animEasingCheck);
    }
  }, 200);

  // Flip Cards Logic
  const cardsSettings = JSON.parse('[{"frontSideClass":"front","backSideClass":"back"},{"frontSideClass":"front2","backSideClass":"back2"},{"frontSideClass":"front3","backSideClass":"back3"},{"frontSideClass":"front4","backSideClass":"back4"},{"frontSideClass":"front5","backSideClass":"back5"},{"frontSideClass":"front6","backSideClass":"back6"},{"frontSideClass":"front7","backSideClass":"back7"},{"frontSideClass":"front8","backSideClass":"back8"},{"frontSideClass":"front9","backSideClass":"back9"}]');
  const isTouchOnlyDevice = ('maxTouchPoints' in navigator && navigator.maxTouchPoints > 0 && matchMedia('(pointer: coarse)').matches && !matchMedia('(hover: hover)').matches);

  setTimeout(() => {
    const style = document.createElement('style');
    style.type = 'text/css';
    let innerHTMLForStyle = ' .tn-group>.tn-molecule.nolim185cardsmod { transform: perspective(1500px) rotateY(180deg)!important; } ';

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
          transform: initial!important;
          transform-style: preserve-3d;
          will-change: transform, opacity;
          transform: rotateY(0deg);
        }

        .${cardSettings.backSideClass} .tn-molecule {
          transform: perspective(1500px) rotateY(-180deg)!important;
          transition: transform 1200ms cubic-bezier(.34,1.56,.64,1);
          backface-visibility: hidden;
          transform-style: preserve-3d;
          will-change: transform;
        }

        .${cardSettings.backSideClass}:has(.activebaby){
          z-index:9998!important;
        }

        .${cardSettings.backSideClass} > .activebaby:not(.bla) {
          transform: perspective(1500px) rotateY(0deg)!important;
        }
      `;

      if (window.isSafari) {
        innerHTMLForStyle += `
          .${cardSettings.frontSideClass} .tn-molecule {
            contain: strict;
          }
        `;
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
        if (window.isSafari) {
          $elem.css({
            'will-change': 'transform, opacity',
            'contain': 'strict',
            'transform': 'rotateY(0deg)',
            'backface-visibility': 'hidden',
            'transform-style': 'preserve-3d'
          });
        } else {
          $elem.css({
            'will-change': 'transform, opacity',
            'transform': 'rotateY(0deg)',
            'backface-visibility': 'hidden',
            'transform-style': 'preserve-3d'
          });
        }
      }

      const intForFrontSideElem = setInterval(() => {
        const frontSideElem = $(`.${cardSettings.frontSideClass}`);
        const backSideElem = $(`.${cardSettings.backSideClass}`);
        if (!frontSideElem.length || !backSideElem.length) return;
        clearInterval(intForFrontSideElem);

        frontSideElem.children('.tn-molecule').each(function () {
          prepareCard($(this));
        });

        backSideElem.children('.tn-molecule').each(function () {
          prepareCard($(this));
        });

        backSideElem.each(function () {
          if (isTouchOnlyDevice) {
            $(this).on('click', handleMouseLeave);
          } else {
            $(this).on('mouseleave', handleMouseLeave);
          }
        });

        frontSideElem.each(function () {
          if (isTouchOnlyDevice) {
            $(this).on('click', handleMouseEnter);
          } else {
            $(this).on('mouseenter', handleMouseEnter);
          }
        });
      }, 100);

      setTimeout(() => {
        clearInterval(intForFrontSideElem);
      }, 7000);
    });

    style.innerHTML = innerHTMLForStyle;
    document.head.appendChild(style);

    setTimeout(() => {
      const styleForLoading = document.querySelector('.nlm185-css-for-loading');
      if (styleForLoading) styleForLoading.remove();
    }, 300);

    setTimeout(() => {
      window.scrollBy(0, 1);
    }, 300);
  }, 0);
});
