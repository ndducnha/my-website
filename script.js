// Menu toggle function
function toggleMenu() {
    const navUl = document.querySelector('nav ul');
    navUl.classList.toggle('show');
}

// Function to set active button state
function setActiveButton(lang) {
    console.log('Setting active button for lang:', lang);
    
    // Remove active from all buttons first
    const allButtons = document.querySelectorAll('.language-selector .lang-btn');
    allButtons.forEach(function(btn) {
        btn.classList.remove('active');
    });
    
    // Find and activate the correct button
    allButtons.forEach(function(btn) {
        const buttonText = btn.textContent.trim();
        console.log('Checking button:', buttonText, 'for lang:', lang);
        
        if ((buttonText === 'English' && lang === 'en') || 
            (buttonText === 'Tiếng Việt' && lang === 'vi')) {
            btn.classList.add('active');
            console.log('Added active to:', buttonText);
        }
    });
}

// Language switcher
function changeLanguage(lang) {
    console.log('Changing language to:', lang);
    
    // Save preference
    localStorage.setItem('preferredLang', lang);
    
    // Update all elements with data-en/data-vi
    document.querySelectorAll('[data-en], [data-vi]').forEach(function(el) {
        if (lang === 'vi' && el.getAttribute('data-vi')) {
            el.textContent = el.getAttribute('data-vi');
        } else if (lang === 'en' && el.getAttribute('data-en')) {
            el.textContent = el.getAttribute('data-en');
        }
    });
    
    // Set active button after content update
    setTimeout(function() {
        setActiveButton(lang);
    }, 100);
}

// Show language modal if no language is set
function showLangModalIfNeeded() {
    var modal = document.getElementById('langModal');
    if (!localStorage.getItem('preferredLang')) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function chooseLangFromModal(lang) {
    localStorage.setItem('preferredLang', lang);
    document.getElementById('langModal').style.display = 'none';
    document.body.style.overflow = '';
    changeLanguage(lang);
}

// Smooth scroll to the menu
function scrollToMenu() {
    const menu = document.getElementById("mainMenu");
    if (menu) {
        menu.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
        console.error("Menu not found");
    }
}

// Main initialization when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM fully loaded and parsed");

    // Check for language preference and show modal if needed
    var lang = localStorage.getItem('preferredLang');
    if (lang) {
        changeLanguage(lang);
        // Also set active button after a short delay to ensure content is updated
        setTimeout(function() {
            setActiveButton(lang);
        }, 200);
    } else {
        showLangModalIfNeeded();
    }

    // Back to menu button functionality
    const backToMenuButton = document.getElementById("backToMenu");
    const menu = document.getElementById("mainMenu");

    if (backToMenuButton) {
        console.log("Back to Menu button found!");
        backToMenuButton.addEventListener("click", function() {
            console.log("Button clicked!");
            if (menu) {
                menu.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                console.error("Menu not found!");
            }
        });
    } else {
        console.error("Back to Menu button not found!");
    }
});

// Scroll event listener for back to menu button
window.addEventListener("scroll", function () {
    const button = document.getElementById("backToMenu");
    if (!button) return;

    console.log("User is scrolling...");
    
    if (window.scrollY > 300) { 
        console.log("Displaying Back to Menu button");
        button.style.display = "block"; 
    } else {
        console.log("Hiding Back to Menu button");
        button.style.display = "none";
    }
}); 