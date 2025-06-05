// NEON ARCADE HUB - Enhanced JavaScript Functionality

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the page with animations and functionality
    initPage();
});

// Main initialization function
function initPage() {
    // Show loader animation
    showLoader();
    
    // Initialize all components with slight delays for smooth animations
    setTimeout(() => {
        initGameBar();
        initCategoryFilters();
        initSearchFunctionality();
        initGameCardAnimations();
        initDarkModeToggle();
        
        // Hide loader after everything is initialized
        hideLoader();
    }, 1500);
}

// Loader functions
function showLoader() {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.classList.remove('hidden');
    }
}

function hideLoader() {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.classList.add('hidden');
    }
}

// Game Bar Initialization
function initGameBar() {
    const gameBar = document.querySelector('.game-bar');
    const navItems = document.querySelectorAll('.nav-item');
    
    // Add active class to first nav item by default
    if (navItems.length > 0) {
        navItems[0].classList.add('active');
    }
    
    // Add click event listeners to nav items
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            navItems.forEach(navItem => navItem.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Scroll to corresponding section if available
            const targetId = this.getAttribute('data-target');
            if (targetId) {
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    // Smooth scroll to target
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Show/hide game bar on scroll
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 300) {
            // Scrolling down & past threshold - hide game bar
            gameBar.style.transform = 'translateY(100%)';
        } else {
            // Scrolling up or at top - show game bar
            gameBar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Category Filter Functionality
function initCategoryFilters() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const gameCards = document.querySelectorAll('.game-card');
    
    // Add active class to "All" button by default
    if (categoryButtons.length > 0) {
        categoryButtons[0].classList.add('active');
    }
    
    // Add click event listeners to category buttons
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get category to filter
            const category = this.getAttribute('data-category');
            
            // Filter game cards
            if (category === 'all') {
                // Show all cards
                gameCards.forEach(card => {
                    animateCardIn(card);
                });
            } else {
                // Filter cards by category
                gameCards.forEach(card => {
                    if (card.getAttribute('data-category') === category) {
                        animateCardIn(card);
                    } else {
                        animateCardOut(card);
                    }
                });
            }
        });
    });
}

// Card animation functions
function animateCardIn(card) {
    // First set display to flex/block if it was none
    if (card.style.display === 'none') {
        card.style.display = '';
    }
    
    // Then animate opacity and transform
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, 50);
}

function animateCardOut(card) {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        card.style.display = 'none';
    }, 300);
}

// Search Functionality
function initSearchFunctionality() {
    const searchBar = document.querySelector('.search-bar');
    const gameItems = document.querySelectorAll('.game-item');
    
    if (searchBar) {
        searchBar.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            gameItems.forEach(item => {
                const gameName = item.querySelector('.game-name').textContent.toLowerCase();
                const gameCard = item.closest('.game-card');
                
                // Check if game name contains search term
                if (gameName.includes(searchTerm)) {
                    item.style.display = '';
                } else {
                    item.style.display = 'none';
                }
                
                // Check if all games in a card are hidden
                const visibleGamesInCard = Array.from(gameCard.querySelectorAll('.game-item')).filter(
                    game => game.style.display !== 'none'
                );
                
                if (visibleGamesInCard.length === 0) {
                    gameCard.style.display = 'none';
                } else {
                    gameCard.style.display = '';
                }
            });
        });
    }
}

// Game Card Animations
function initGameCardAnimations() {
    const gameCards = document.querySelectorAll('.game-card');
    
    // Add hover effects and animations
    gameCards.forEach(card => {
        // Create glowing effect on hover
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = `0 15px 30px rgba(0, 0, 0, 0.3),
                                   0 0 30px rgba(0, 255, 255, 0.3),
                                   inset 0 0 20px rgba(0, 255, 255, 0.1)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = `0 0 20px rgba(0, 255, 255, 0.1),
                                   inset 0 0 20px rgba(0, 255, 255, 0.05)`;
        });
        
        // Add parallax effect to game items within cards
        const gameItems = card.querySelectorAll('.game-item');
        gameItems.forEach(item => {
            item.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const moveX = (x - centerX) / 20;
                const moveY = (y - centerY) / 20;
                
                this.style.transform = `translateX(${moveX}px) translateY(${moveY}px)`;
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = '';
            });
        });
    });
    
    // Add scroll reveal animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    gameCards.forEach(card => {
        observer.observe(card);
    });
}

// Dark Mode Toggle
function initDarkModeToggle() {
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    const body = document.body;
    
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            body.classList.toggle('light-mode');
            
            // Update icon
            const icon = this.querySelector('i');
            if (body.classList.contains('light-mode')) {
                icon.className = 'fas fa-moon';
            } else {
                icon.className = 'fas fa-sun';
            }
            
            // Save preference to localStorage
            const isDarkMode = !body.classList.contains('light-mode');
            localStorage.setItem('darkMode', isDarkMode);
        });
        
        // Check for saved preference
        const savedDarkMode = localStorage.getItem('darkMode');
        if (savedDarkMode === 'false') {
            body.classList.add('light-mode');
            darkModeToggle.querySelector('i').className = 'fas fa-moon';
        }
    }
}

// Particle Background Effect
function initParticleBackground() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 100;
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 2 + 1,
            color: i % 2 === 0 ? 'rgba(0, 255, 255, 0.5)' : 'rgba(255, 0, 255, 0.5)',
            speedX: Math.random() * 2 - 1,
            speedY: Math.random() * 2 - 1
        });
    }
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            // Move particles
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Bounce off edges
            if (particle.x < 0 || particle.x > canvas.width) {
                particle.speedX = -particle.speedX;
            }
            
            if (particle.y < 0 || particle.y > canvas.height) {
                particle.speedY = -particle.speedY;
            }
            
            // Draw particle
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.fill();
            
            // Connect particles that are close to each other
            particles.forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 - distance/1000})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.stroke();
                }
            });
        });
    }
    
    animate();
    
    // Resize canvas when window is resized
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Game Rating System
function initGameRatings() {
    const ratingStars = document.querySelectorAll('.rating-star');
    
    ratingStars.forEach(star => {
        star.addEventListener('click', function() {
            const gameId = this.closest('.game-item').getAttribute('data-id');
            const rating = this.getAttribute('data-rating');
            
            // Remove active class from all stars in this game
            const allStarsForGame = this.closest('.rating').querySelectorAll('.rating-star');
            allStarsForGame.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked star and all stars before it
            for (let i = 0; i < rating; i++) {
                allStarsForGame[i].classList.add('active');
            }
            
            // Save rating to localStorage
            localStorage.setItem(`game-rating-${gameId}`, rating);
            
            // Show rating confirmation
            const confirmationEl = this.closest('.game-item').querySelector('.rating-confirmation');
            if (confirmationEl) {
                confirmationEl.textContent = `Rated ${rating}/5`;
                confirmationEl.style.opacity = '1';
                
                setTimeout(() => {
                    confirmationEl.style.opacity = '0';
                }, 2000);
            }
        });
    });
    
    // Load saved ratings
    document.querySelectorAll('.game-item').forEach(gameItem => {
        const gameId = gameItem.getAttribute('data-id');
        const savedRating = localStorage.getItem(`game-rating-${gameId}`);
        
        if (savedRating) {
            const stars = gameItem.querySelectorAll('.rating-star');
            for (let i = 0; i < savedRating; i++) {
                if (stars[i]) stars[i].classList.add('active');
            }
        }
    });
}

// Recently Played Games
function initRecentlyPlayed() {
    // Load recently played games from localStorage
    const recentlyPlayed = JSON.parse(localStorage.getItem('recentlyPlayed')) || [];
    const recentlyPlayedContainer = document.querySelector('.recently-played-games');
    
    if (recentlyPlayedContainer && recentlyPlayed.length > 0) {
        // Clear container
        recentlyPlayedContainer.innerHTML = '';
        
        // Add heading
        const heading = document.createElement('h3');
        heading.textContent = 'Recently Played';
        heading.className = 'recently-played-heading';
        recentlyPlayedContainer.appendChild(heading);
        
        // Add games (limit to 5)
        recentlyPlayed.slice(0, 5).forEach(game => {
            const gameEl = document.createElement('div');
            gameEl.className = 'recently-played-item';
            gameEl.innerHTML = `
                <img src="${game.image}" alt="${game.name}" class="recently-played-img">
                <div class="recently-played-info">
                    <div class="recently-played-name">${game.name}</div>
                    <div class="recently-played-time">${game.time}</div>
                </div>
            `;
            
            gameEl.addEventListener('click', function() {
                window.location.href = game.url;
            });
            
            recentlyPlayedContainer.appendChild(gameEl);
        });
    }
}

// Add game to recently played
function addToRecentlyPlayed(gameData) {
    // Get existing data
    let recentlyPlayed = JSON.parse(localStorage.getItem('recentlyPlayed')) || [];
    
    // Remove this game if it already exists in the list
    recentlyPlayed = recentlyPlayed.filter(game => game.url !== gameData.url);
    
    // Add game to the beginning of the array
    recentlyPlayed.unshift({
        name: gameData.name,
        image: gameData.image,
        url: gameData.url,
        time: new Date().toLocaleString()
    });
    
    // Limit to 10 games
    if (recentlyPlayed.length > 10) {
        recentlyPlayed = recentlyPlayed.slice(0, 10);
    }
    
    // Save back to localStorage
    localStorage.setItem('recentlyPlayed', JSON.stringify(recentlyPlayed));
}

// Track game clicks
document.addEventListener('DOMContentLoaded', function() {
    const gameItems = document.querySelectorAll('.game-item');
    
    gameItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Get game data
            const gameData = {
                name: this.querySelector('.game-name').textContent,
                image: this.querySelector('.game-image').src,
                url: this.getAttribute('href')
            };
            
            // Add to recently played
            addToRecentlyPlayed(gameData);
        });
    });
});

// Initialize particle background if canvas exists
window.addEventListener('load', function() {
    initParticleBackground();
    initGameRatings();
    initRecentlyPlayed();
});
