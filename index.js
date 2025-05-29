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
let currentProjectIndex = 0;
const projectCards = document.querySelectorAll(".project-card");
const projectsSection = document.querySelector(".projects-section");

function updateActiveProject(index) {
  projectCards.forEach((card, i) => {
    card.classList.toggle("active", i === index);
  });
}

// Handle scroll within projects section
function handleProjectsScroll() {
  if (!projectsSection || projectCards.length === 0) return;

  const rect = projectsSection.getBoundingClientRect();
  const sectionHeight = projectsSection.offsetHeight;
  const viewportHeight = window.innerHeight;

  // Check if projects section is in view
  if (rect.top <= viewportHeight && rect.bottom >= 0) {
    let scrollProgress = 0;

    if (rect.top <= 0) {
      // We're scrolling through the section
      scrollProgress =
        Math.abs(rect.top) / Math.max(sectionHeight - viewportHeight, 1);
    } else {
      // Section is coming into view
      scrollProgress = 0;
    }

    // Clamp scroll progress between 0 and 1
    scrollProgress = Math.max(0, Math.min(scrollProgress, 1));

    // Calculate which project should be active
    const totalProjects = projectCards.length;
    const projectIndex = Math.floor(scrollProgress * totalProjects);
    const clampedIndex = Math.max(0, Math.min(projectIndex, totalProjects - 1));

    if (clampedIndex !== currentProjectIndex) {
      currentProjectIndex = clampedIndex;
      updateActiveProject(currentProjectIndex);
    }
  }
}

// Add scroll event listener
window.addEventListener("scroll", handleProjectsScroll);

// Initialize first project as active when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  if (projectCards.length > 0) {
    updateActiveProject(0);
  }
});
