/**
 * Utility functions for photo settings app
 */
import { 
    data, 
    state,
    getApertureSegments, 
    getApertureProgress, 
    getISOProgress 
} from './core.js';

/**
 * Generates HTML for aperture segments visualization
 * @param {string} value - The aperture value (e.g., 'f/1.8')
 * @returns {string} HTML string for segments
 */
function generateApertureSegments(value) {
    const segments = getApertureSegments(value)
        .map((className, i) => `<div class="segment ${className}"></div>`)
        .join('');
        
    return `
        <div class="segments-container">
            ${segments}
        </div>
        <div class="aperture-labels">
            <span>f/1.8</span>
            <span>f/2.8</span>
            <span>f/4</span>
            <span>f/5.6</span>
            <span>f/8</span>
        </div>
    `;
}

/**
 * Generates HTML for aperture progress bar
 * @param {string} value - The aperture value
 * @returns {string} HTML string for progress bar
 */
function generateApertureProgress(value) {
    return `
        <div class="progress-container">
            <div class="progress-label">
                <span>f/1.8</span>
                <span class="value-label">${value}</span>
                <span>f/8</span>
            </div>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${getApertureProgress(value)}%"></div>
            </div>
        </div>
    `;
}

/**
 * Generates HTML for ISO progress bar
 * @param {string} iso - The ISO value
 * @returns {string} HTML string for ISO progress bar
 */
function generateISOProgress(iso) {
    return `
        <div class="progress-container">
            <div class="progress-label">
                <span>ISO 100</span>
                <span class="value-label">ISO ${iso}</span>
                <span>ISO 800</span>
            </div>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${getISOProgress(iso)}%"></div>
            </div>
        </div>
    `;
}

/**
 * Generates HTML content for a card
 * @param {Object} item - The item data
 * @param {string} section - Current section name
 * @returns {string} HTML string for card content
 */
function generateCardContent(item, section) {
    if (!item.iso) {
        return `
            <h2>${item.value}</h2>
            <p>${item.settings}</p>
        `;
    }

    const apertureVisual = section === 'aperture' 
        ? generateApertureSegments(item.value)
        : generateApertureProgress(item.aperture || item.value);

    return `
        <h2>${item.value}</h2>
        <p>${item.conditions}</p>
        <div class="details">
            ${apertureVisual}
            ${generateISOProgress(item.iso)}
            <span>${item.shutter ? 'Tempo: '+item.shutter : 'Diaframma: '+item.aperture}</span>
        </div>
    `;
}

/**
 * Updates the UI to show the selected section
 * @param {string} section - Section to display ('aperture', 'shutter', or 'scenes')
 */
function showSection(section) {
    state.currentSection = section;
    const content = document.getElementById('content');
    content.innerHTML = '';

    document.querySelectorAll('.nav-btn').forEach(btn => {
        const isActive = btn.dataset.section === section;
        btn.classList.toggle('active', isActive);
    });

    data[state.currentLanguage][section].forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = generateCardContent(item, section);
        content.appendChild(card);
    });
}

// Export utility functions
export {
    generateApertureSegments,
    generateApertureProgress,
    generateISOProgress,
    generateCardContent,
    showSection
};
