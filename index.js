// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Header background on scroll
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header");
  if (window.scrollY > 100) {
    header.style.background = "rgba(30, 60, 114, 0.98)";
  } else {
    header.style.background = "rgba(30, 60, 114, 0.95)";
  }
});

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll(".fade-in").forEach((el) => {
  observer.observe(el);
});

// Parallax effect removed for video hero section
// window.addEventListener('scroll', () => {
//     const scrolled = window.pageYOffset;
//     const hero = document.querySelector('.hero');
//     if (hero) {
//         hero.style.transform = `translateY(${scrolled * 0.5}px)`;
//     }
// });

// Dynamic wave animation speeds
let waveElements = document.querySelectorAll(
  ".hero::before, .beach-section::before"
);
setInterval(() => {
  const randomSpeed = 2 + Math.random() * 3; // Random speed between 2-5 seconds
  document.documentElement.style.setProperty(
    "--wave-duration",
    `${randomSpeed}s`
  );
}, 5000);

// Hover effects for gallery items
document.querySelectorAll(".gallery-item").forEach((item) => {
  item.addEventListener("mouseenter", () => {
    item.style.transform = "scale(1.05) rotate(1deg)";
  });

  item.addEventListener("mouseleave", () => {
    item.style.transform = "scale(1) rotate(0deg)";
  });
});

// CTA button pulse effect removed since CTA button is no longer present
// const ctaButton = document.querySelector('.cta-button');
// setInterval(() => {
//     ctaButton.style.boxShadow = '0 8px 25px rgba(74, 144, 226, 0.6)';
//     setTimeout(() => {
//         ctaButton.style.boxShadow = '0 4px 15px rgba(74, 144, 226, 0.3)';
//     }, 1000);
// }, 3000);
// Projects Section Scroll Animation

let currentSlideIndex = 0;
const totalSlides = 3;

// Update card positions based on current index
function updateCardPositions() {
  const cards = document.querySelectorAll(".project-card");
  const overviewItems = document.querySelectorAll(".overview-item");

  cards.forEach((card, index) => {
    const cardIndex = parseInt(card.dataset.index);
    let position;

    if (cardIndex === currentSlideIndex) {
      position = "active";
    } else if (
      cardIndex ===
      (currentSlideIndex - 1 + totalSlides) % totalSlides
    ) {
      position = "prev";
    } else if (cardIndex === (currentSlideIndex + 1) % totalSlides) {
      position = "next";
    } else {
      position = "hidden";
    }

    card.setAttribute("data-position", position);
  });

  // Update overview content
  overviewItems.forEach((item, index) => {
    item.classList.toggle("active", index === currentSlideIndex);
  });
}

// Navigate slider
function navigateSlider(direction) {
  if (direction === "next") {
    currentSlideIndex = (currentSlideIndex + 1) % totalSlides;
  } else {
    currentSlideIndex = (currentSlideIndex - 1 + totalSlides) % totalSlides;
  }
  updateCardPositions();
}

// Auto-advance slider every 5 seconds
setInterval(() => {
  navigateSlider("next");
}, 5000);

// Click on cards to navigate
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("click", () => {
    const clickedIndex = parseInt(card.dataset.index);
    if (clickedIndex !== currentSlideIndex) {
      currentSlideIndex = clickedIndex;
      updateCardPositions();
    }
  });
});

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  updateCardPositions();
});
