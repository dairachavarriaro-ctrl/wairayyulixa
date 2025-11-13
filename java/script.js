
const handleCountdown = () => {
  const countdownElement = document.getElementById('countdown');
  
  if (!countdownElement) {
    console.warn('Countdown element not found');
    return;
  }


  const eventDate = new Date(2025, 10, 23, 20, 0, 0); 

  const updateCountdown = () => {
    const currentTime = new Date();
    const difference = eventDate - currentTime;

    if (difference <= 0) {
      countdownElement.textContent = '00:00:00';
      return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((difference % (1000 * 60)) / 1000);
    

    const formattedTime = `${String(days).padStart(3, '0')}:${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    countdownElement.textContent = formattedTime;
  };

  updateCountdown();
  setInterval(updateCountdown, 1000);
};


const handleGallery = () => {
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const galleryTrack = document.getElementById('galleryTrack');

  if (!prevBtn || !nextBtn || !galleryTrack) return;

  const slides = galleryTrack.querySelectorAll('.gallery-slide');
  let currentIndex = 0;

  const updateGallery = () => {
    const translateX = -currentIndex * 100;
    galleryTrack.style.transform = `translateX(${translateX}%)`;
  };

  const handleNext = () => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateGallery();
  };

  const handlePrev = () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateGallery();
  };

  nextBtn.addEventListener('click', handleNext);
  prevBtn.addEventListener('click', handlePrev);


};



const handleScrollAnimations = () => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);


  const animatedElements = document.querySelectorAll(
    '.discover-card, .music-section, .countdown-section, .gallery-section, .section-title'
  );
  
  animatedElements.forEach(el => {
    el.classList.add('fade-in-on-scroll');
    observer.observe(el);
  });
};


const handleStickyNavbar = () => {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  let lastScroll = 0;
  const scrollThreshold = 100;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > scrollThreshold) {
      navbar.classList.add('navbar-scrolled');
    } else {
      navbar.classList.remove('navbar-scrolled');
    }

    lastScroll = currentScroll;
  });
};

const handleSmoothScroll = () => {
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      
      if (href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          const offset = 80;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
};


const preloadImages = () => {
  const criticalImages = [
    'assets/2.png',
    'assets/9.png'
  ];

  criticalImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
};


const handleLazyLoading = () => {
  if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => {
      img.src = img.dataset.src;
    });
  } else {

    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          observer.unobserve(img);
        }
      });
    });

    document.querySelectorAll('img.lazy').forEach(img => {
      imageObserver.observe(img);
    });
  }
};


const handleParallax = () => {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * 0.5;
    
    if (hero) {
      hero.style.transform = `translateY(${rate}px)`;
    }
  });
};


const handleHamburgerMenu = () => {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!hamburgerBtn || !navMenu) return;

  const toggleMenu = () => {
    hamburgerBtn.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
  };

  hamburgerBtn.addEventListener('click', toggleMenu);

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburgerBtn.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

 
  document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('active') && 
        !navMenu.contains(e.target) && 
        !hamburgerBtn.contains(e.target)) {
      toggleMenu();
    }
  });
};


document.addEventListener('DOMContentLoaded', () => {
  handleCountdown();
  handleGallery();
  handleSmoothScroll();
  handleScrollAnimations();
  handleStickyNavbar();
  handleHamburgerMenu();
  preloadImages();
  handleLazyLoading();

});

