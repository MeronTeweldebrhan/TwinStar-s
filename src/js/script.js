document.addEventListener('DOMContentLoaded', () => {
    console.log("Twinstars Quantum Alignment Website Loaded Successfully!");

    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Simple validation
            let isValid = true;
            for (let [key, value] of Object.entries(data)) {
                if (!value.trim()) {
                    isValid = false;
                    break;
                }
            }
            
            if (isValid) {
                // Here you would typically send the data to a server
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
            } else {
                alert('Please fill in all fields.');
            }
        });
    }

    // Newsletter form handling with EmailJS
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            if (emailInput && emailInput.value) {
                // EmailJS credentials
                const USER_ID = "n0Pr7KDvjWfqXN4Tl"; // Public Key
                const SERVICE_ID = "service_l35043r"; // Service ID
                const TEMPLATE_ID = "template_5zzpngq"; // Template ID
                
                // Initialize EmailJS
                emailjs.init(USER_ID);
                
                // Prepare email template parameters
                const templateParams = {
                    to_email: emailInput.value,
                    to_name: "Valued Subscriber",
                    from_name: "Twinstars Team",
                    subject: "Welcome to Twinstars Newsletter! 🌟",
                    message: `Thank you for subscribing to the Twinstars newsletter!

We're excited to have you join our community. You'll be the first to receive:
• Updates about Secret Travelers developments
• Exclusive behind-the-scenes content
• Early access to new project announcements
• Special community events and opportunities

Stay tuned for our upcoming updates!

Best regards,
The Twinstars Team`,
                    reply_to: "info@twinstars.com"
                };
                
                // Send welcome email using EmailJS
                emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams)
                    .then(
                        function(response) {
                            console.log("SUCCESS", response);
                            alert('Welcome to the Twinstars community! Check your email for a confirmation message.');
                            newsletterForm.reset();
                        },
                        function(error) {
                            console.error("FAILED", error);
                            alert('Oops! Something went wrong. Please try again later.');
                        }
                    );
            }
        });
    }

    // Add smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add hover animation for project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.transition = 'transform 0.3s ease';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // Habesha Harmony Specific Features
    if (window.location.pathname.includes('habesha-harmony')) {
        // Debate Topic Filter
        const debateTopics = document.querySelectorAll('.debate-topic');
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Search upcoming debates...';
        searchInput.className = 'debate-search';
        
        const upcomingDebates = document.querySelector('.upcoming-debates');
        if (upcomingDebates) {
            upcomingDebates.insertBefore(searchInput, upcomingDebates.querySelector('.debate-topic'));
            
            searchInput.addEventListener('input', (e) => {
                const searchTerm = e.target.value.toLowerCase();
                debateTopics.forEach(topic => {
                    const title = topic.querySelector('h3').textContent.toLowerCase();
                    const description = topic.querySelector('p').textContent.toLowerCase();
                    const isVisible = title.includes(searchTerm) || description.includes(searchTerm);
                    topic.style.display = isVisible ? 'flex' : 'none';
                });
            });
        }

        // Speaker Registration Form
        const registerBtn = document.querySelector('a[href="contact.html"].btn.primary');
        if (registerBtn) {
            registerBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const modal = document.createElement('div');
                modal.className = 'registration-modal';
                modal.innerHTML = `
                    <div class="modal-content">
                        <h2>Register as a Speaker</h2>
                        <form id="speakerForm">
                            <input type="text" placeholder="Full Name" required>
                            <input type="email" placeholder="Email" required>
                            <select required>
                                <option value="">Select Debate Topic</option>
                                <option value="cultural-identity">Cultural Identity</option>
                                <option value="generational-perspectives">Generational Perspectives</option>
                                <option value="economic-empowerment">Economic Empowerment</option>
                            </select>
                            <textarea placeholder="Brief introduction and expertise" required></textarea>
                            <div class="modal-buttons">
                                <button type="submit" class="btn primary">Submit</button>
                                <button type="button" class="btn secondary close-modal">Cancel</button>
                            </div>
                        </form>
                    </div>
                `;
                document.body.appendChild(modal);
                
                // Close modal functionality
                const closeBtn = modal.querySelector('.close-modal');
                closeBtn.addEventListener('click', () => {
                    document.body.removeChild(modal);
                });
                
                // Form submission
                const speakerForm = modal.querySelector('#speakerForm');
                speakerForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    alert('Thank you for registering! We will review your application and contact you soon.');
                    document.body.removeChild(modal);
                });
            });
        }

        // Debate countdown timer
        const debateDates = document.querySelectorAll('.debate-date');
        debateDates.forEach(dateElement => {
            const debateDate = new Date(dateElement.textContent);
            const updateTimer = () => {
                const now = new Date();
                const diff = debateDate - now;
                
                if (diff > 0) {
                    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    dateElement.innerHTML = `${dateElement.textContent}<br><span class="countdown">${days}d ${hours}h until debate</span>`;
                }
            };
            updateTimer();
            setInterval(updateTimer, 1000 * 60 * 60); // Update every hour
        });
    }
});