let currentStage = 1;

const FALLBACK_WORD = {
    word: 'Beer',
};

function getTodayString() {
    const today = new Date();
    return today.getFullYear() + '-' +
        String(today.getMonth() + 1).padStart(2, '0') + '-' +
        String(today.getDate()).padStart(2, '0');
}

async function getTodayWord() {
    try {
        // Fetch words from the JSON file
        const response = await fetch('words.json');
        if (!response.ok) throw new Error('Failed to load words');

        const data = await response.json();
        const todayStr = getTodayString();

        // Return today's word or fallback
        return data[todayStr] || FALLBACK_WORD;

    } catch (error) {
        console.log('Using fallback word:', error.message);
        return FALLBACK_WORD;
    }
}

function nextStage() {
    const card = document.getElementById('card');

    if (currentStage === 1) {
        // Stage 1 -> 2: Flip the card
        card.classList.add('flipped');
        currentStage = 2;
    } else if (currentStage === 2) {
        // Stage 2 -> 3: Spin and reveal the word
        card.classList.add('final-reveal');
        currentStage = 3;
    }
    // Stage 3: Do nothing (final state reached)
}

function createParticles() {
    const particlesContainer = document.getElementById('particles');

    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 3 + 's';
        particle.style.animationDuration = (Math.random() * 2 + 2) + 's';
        particlesContainer.appendChild(particle);
    }
}

function init() {
    getTodayWord().then(todayWord => {
        document.getElementById('wordText').textContent = todayWord.word;
    });

    createParticles();
}

// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', init);