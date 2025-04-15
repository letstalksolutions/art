// Art Hair & Beauty Website JavaScript

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.mobile-menu-btn') && !event.target.closest('.nav-menu')) {
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Add fixed header on scroll
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    
    // Simple form validation for contact form
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let valid = true;
            const nameInput = contactForm.querySelector('input[name="name"]');
            const emailInput = contactForm.querySelector('input[name="email"]');
            const messageInput = contactForm.querySelector('textarea[name="message"]');
            
            // Reset error states
            contactForm.querySelectorAll('.form-group').forEach(group => {
                group.classList.remove('error');
            });
            
            // Validate name
            if (!nameInput.value.trim()) {
                nameInput.parentElement.classList.add('error');
                valid = false;
            }
            
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
                emailInput.parentElement.classList.add('error');
                valid = false;
            }
            
            // Validate message
            if (!messageInput.value.trim()) {
                messageInput.parentElement.classList.add('error');
                valid = false;
            }
            
            if (valid) {
                // In a real implementation, this would send the form data to a server
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = 'Thank you for your message! We will get back to you soon.';
                
                contactForm.innerHTML = '';
                contactForm.appendChild(successMessage);
            }
        });
    }
    
    // Testimonial slider (if multiple testimonials)
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    if (testimonialItems.length > 1) {
        let currentTestimonial = 0;
        
        // Hide all testimonials except the first one
        for (let i = 1; i < testimonialItems.length; i++) {
            testimonialItems[i].style.display = 'none';
        }
        
        // Create navigation dots
        const testimonialContainer = document.querySelector('.testimonials-container');
        if (testimonialContainer) {
            const dotsContainer = document.createElement('div');
            dotsContainer.className = 'testimonial-dots';
            
            for (let i = 0; i < testimonialItems.length; i++) {
                const dot = document.createElement('span');
                dot.className = 'testimonial-dot';
                if (i === 0) dot.classList.add('active');
                dot.dataset.index = i;
                dotsContainer.appendChild(dot);
                
                dot.addEventListener('click', function() {
                    showTestimonial(parseInt(this.dataset.index));
                });
            }
            
            testimonialContainer.appendChild(dotsContainer);
            
            // Auto-rotate testimonials
            setInterval(function() {
                currentTestimonial = (currentTestimonial + 1) % testimonialItems.length;
                showTestimonial(currentTestimonial);
            }, 5000);
            
            function showTestimonial(index) {
                // Hide all testimonials
                testimonialItems.forEach(item => {
                    item.style.display = 'none';
                });
                
                // Show selected testimonial
                testimonialItems[index].style.display = 'block';
                
                // Update active dot
                document.querySelectorAll('.testimonial-dot').forEach(dot => {
                    dot.classList.remove('active');
                });
                document.querySelector(`.testimonial-dot[data-index="${index}"]`).classList.add('active');
                
                currentTestimonial = index;
            }
        }
    }
    
    // Add animation on scroll
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    if (animatedElements.length > 0) {
        // Add initial hidden class
        animatedElements.forEach(el => {
            el.classList.add('hidden');
        });
        
        // Check if element is in viewport
        function isInViewport(el) {
            const rect = el.getBoundingClientRect();
            return (
                rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
                rect.bottom >= 0
            );
        }
        
        // Show elements when they enter viewport
        function showVisibleElements() {
            animatedElements.forEach(el => {
                if (isInViewport(el) && el.classList.contains('hidden')) {
                    el.classList.remove('hidden');
                    el.classList.add('visible');
                }
            });
        }
        
        // Check on scroll
        window.addEventListener('scroll', showVisibleElements);
        
        // Check on initial load
        showVisibleElements();
    }
});
