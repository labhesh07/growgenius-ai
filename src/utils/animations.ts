
export const observeElements = () => {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
  };

  // Use a single observer instance for better performance
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-enter-active');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Cache the NodeList to avoid requerying the DOM
  const elements = document.querySelectorAll('.animate-enter');
  
  // Use requestAnimationFrame to batch DOM operations
  requestAnimationFrame(() => {
    elements.forEach((el, index) => {
      el.setAttribute('style', `--index: ${index}`);
      observer.observe(el);
    });
  });

  // Return cleanup function
  return () => {
    elements.forEach((el) => {
      observer.unobserve(el);
    });
  };
};

// Cache results with a simple memoization pattern
export const getRandomDelay = (() => {
  const cache = new Map();
  
  return (min = 0, max = 5) => {
    const key = `${min}-${max}`;
    
    if (!cache.has(key)) {
      cache.set(key, (Math.floor(Math.random() * (max - min + 1)) + min) * 100);
    }
    
    return cache.get(key);
  };
})();

