const slides = document.querySelectorAll('.slide');
const previousElement = document.querySelector('#prev-slide');
const nextElement = document.querySelector('#next-slide');
const swipeElement = document.querySelector('#swipe');

const length = slides.length;
const swipe = new Hammer(swipeElement);

let num = 0;

if (slides && previousElement && nextElement && swipeElement) {
  function slide(num, state, length) {
    let left = document.querySelector(`#slide-${(num - 2 + length) % length}`);
    let previous = document.querySelector(
      `#slide-${(num - 1 + length) % length}`
    );
    let active = document.querySelector(`#slide-${num}`);
    let next = document.querySelector(`#slide-${(num + 1 + length) % length}`);
    let right = document.querySelector(`#slide-${(num + 2 + length) % length}`);

    if (state === 'previous') {
      active.classList.remove('previous');
      active.classList.add('active');

      previous.classList.remove('left');
      previous.classList.add('previous');

      left.classList.remove('right');
      left.classList.add('left');

      right.classList.remove('next');
      right.classList.add('right');

      next.classList.remove('active');
      next.classList.add('next');

    } else if (state === 'next') {
      
      active.classList.remove('next');
      active.classList.add('active');

      next.classList.remove('right');
      next.classList.add('next');

      right.classList.remove('left');
      right.classList.add('right');

      previous.classList.remove('active');
      previous.classList.add('previous');

      left.classList.remove('previous');
      left.classList.add('left');
    }
  }
  function previousSlide() {
    num = (num - 1 + length) % length;
    slide(num, 'previous', length);
  }
  function nextSlide() {
    num = (num + 1 + length) % length;
    slide(num, 'next', length);
  }

  previousElement.addEventListener('click', previousSlide);
  nextElement.addEventListener('click', nextSlide);

  swipe.on('swipeleft', event => {
    nextSlide();
  });
  swipe.on('swiperight', event => {
    previousSlide();
  });
}
