// GLOVANCE DIGITAL SOLUTIONS - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initAnimations();
    initTestimonialSlider();
    initCounters();
    initFAQ();
    initContactForm();
    initPageTransitions();
    
    console.log('GLOVANCE DIGITAL SOLUTIONS - Website initialized');
});

// Navigation functionality
function initNavigation() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const navbar = document.getElementById('navbar');
    
    // Mobile menu toggle
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // Navbar scroll effect
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('bg-gray-900');
                navbar.classList.remove('bg-gray-900/80');
            } else {
                navbar.classList.remove('bg-gray-900');
                navbar.classList.add('bg-gray-900/80');
            }
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        });
    });
}

// Scroll animations
function initAnimations() {
    const fadeElements = document.querySelectorAll('.fade-up');
    
    // Create intersection observer for fade-up animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe all fade-up elements
    fadeElements.forEach(element => {
        observer.observe(element);
    });
}

// Testimonial slider
function initTestimonialSlider() {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.testimonial-dot');
    let currentSlide = 0;
    
    if (slides.length === 0) return;
    
    // Function to show a specific slide
    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
            dot.classList.remove('bg-cyan-500');
            dot.classList.add('bg-gray-700');
        });
        
        // Show the selected slide
        slides[index].classList.add('active');
        
        // Activate the corresponding dot
        if (dots[index]) {
            dots[index].classList.add('active', 'bg-cyan-500');
            dots[index].classList.remove('bg-gray-700');
        }
        
        currentSlide = index;
    }
    
    // Add click events to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });
    
    // Auto-advance slides every 5 seconds
    setInterval(() => {
        let nextSlide = (currentSlide + 1) % slides.length;
        showSlide(nextSlide);
    }, 5000);
}

// Counter animation
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    
    if (counters.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
    
    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 20);
    }
}

// FAQ functionality
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-answer').classList.add('hidden');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
            const answer = item.querySelector('.faq-answer');
            answer.classList.toggle('hidden');
        });
    });
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Validate form
        if (validateForm(name, email, subject, message)) {
            // Show loading state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.innerHTML = '<div class="loading-spinner"></div> Sending...';
            submitButton.disabled = true;
            
            // Simulate form submission (replace with actual form submission)
            setTimeout(() => {
                // Show success message
                document.getElementById('form-success').classList.remove('hidden');
                document.getElementById('form-error').classList.add('hidden');
                
                // Reset form
                contactForm.reset();
                
                // Reset button
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    document.getElementById('form-success').classList.add('hidden');
                }, 5000);
            }, 1500);
        }
    });
    
    // Real-time validation
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearError(this);
        });
    });
    
    function validateForm(name, email, subject, message) {
        let isValid = true;
        
        if (!name || name.trim() === '') {
            showError(document.getElementById('name'), 'Please enter your name');
            isValid = false;
        }
        
        if (!email || !isValidEmail(email)) {
            showError(document.getElementById('email'), 'Please enter a valid email address');
            isValid = false;
        }
        
        if (!subject || subject.trim() === '') {
            showError(document.getElementById('subject'), 'Please enter a subject');
            isValid = false;
        }
        
        if (!message || message.trim() === '') {
            showError(document.getElementById('message'), 'Please enter your message');
            isValid = false;
        }
        
        return isValid;
    }
    
    function validateField(field) {
        const value = field.value.trim();
        
        if (field.id === 'name' && value === '') {
            showError(field, 'Please enter your name');
            return false;
        }
        
        if (field.id === 'email') {
            if (value === '') {
                showError(field, 'Please enter your email address');
                return false;
            } else if (!isValidEmail(value)) {
                showError(field, 'Please enter a valid email address');
                return false;
            }
        }
        
        if (field.id === 'subject' && value === '') {
            showError(field, 'Please enter a subject');
            return false;
        }
        
        if (field.id === 'message' && value === '') {
            showError(field, 'Please enter your message');
            return false;
        }
        
        clearError(field);
        return true;
    }
    
    function showError(field, message) {
        field.classList.add('form-error');
        const errorElement = field.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.remove('hidden');
        }
    }
    
    function clearError(field) {
        field.classList.remove('form-error');
        const errorElement = field.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.classList.add('hidden');
        }
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

// Page transitions
function initPageTransitions() {
    // Add loaded class to body after page load
    document.body.classList.add('loaded');
    
    // Handle internal link clicks for smooth transitions
    const internalLinks = document.querySelectorAll('a[href^=""]');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle internal links that aren't anchor links
            if (href && !href.startsWith('#') && !href.startsWith('http')) {
                e.preventDefault();
                
                // Add fade-out effect
                document.body.style.opacity = '0';
                
                // Navigate after transition
                setTimeout(() => {
                    window.location.href = href;
                }, 300);
            }
        });
    });
}

// Utility function to check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});