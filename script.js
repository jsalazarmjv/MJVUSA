// Initialize EmailJS
// Replace 'YOUR_PUBLIC_KEY' with your actual EmailJS public key
emailjs.init("YOUR_PUBLIC_KEY");

// Current language state
let currentLang = 'es';

/**
 * Toggle between Spanish and English
 */
function toggleLanguage() {
    currentLang = currentLang === 'es' ? 'en' : 'es';
    const elements = document.querySelectorAll('[data-es][data-en]');
    
    elements.forEach(el => {
        el.textContent = el.getAttribute(`data-${currentLang}`);
    });

    // Update HTML lang attribute for accessibility
    document.documentElement.lang = currentLang;
}

/**
 * Toggle mobile menu
 */
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
}

/**
 * Close mobile menu when clicking on a navigation link
 */
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('navLinks').classList.remove('active');
    });
});

/**
 * Contact Form Submission with EmailJS
 */
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitButton = e.target.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // Show loading state
    submitButton.textContent = currentLang === 'es' ? 'Enviando...' : 'Sending...';
    submitButton.disabled = true;

    // Prepare template parameters
    const templateParams = {
        from_name: document.getElementById('name').value,
        from_email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        message: document.getElementById('message').value
    };

    // Send email using EmailJS
    // Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with your actual IDs
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            alert(currentLang === 'es' ? 
                '¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.' : 
                'Message sent successfully! We will contact you soon.');
            
            // Reset form
            document.getElementById('contactForm').reset();
        }, function(error) {
            console.error('FAILED...', error);
            alert(currentLang === 'es' ? 
                'Error al enviar el mensaje. Por favor intente de nuevo.' : 
                'Error sending message. Please try again.');
        })
        .finally(function() {
            // Restore button state
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        });
});

/**
 * Smooth scrolling for navigation links
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

/**
 * Intersection Observer for scroll animations
 */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
        }
    });
}, observerOptions);

// Observe all sections for animation
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});