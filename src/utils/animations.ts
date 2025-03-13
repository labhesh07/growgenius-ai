
export const observeElements = () => {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-enter-active');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const elements = document.querySelectorAll('.animate-enter');
  elements.forEach((el, index) => {
    el.style.setProperty('--index', index.toString());
    observer.observe(el);
  });

  return () => {
    elements.forEach((el) => {
      observer.unobserve(el);
    });
  };
};

export const getRandomDelay = (min = 0, max = 5) => {
  return (Math.floor(Math.random() * (max - min + 1)) + min) * 100;
};
