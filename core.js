/**
 * Core functions for photo settings app
 */

let currentLanguage = 'it';
let currentSection = 'aperture';

const data = {
    it: {
        aperture: [
            { value: 'f/1.8', conditions: 'Poca luce, effetto bokeh', iso: '100-400', shutter: '1/60-1/250' },
            { value: 'f/2.8-4', conditions: 'Uso generale, ritratti', iso: '100-400', shutter: '1/125-1/500' },
            { value: 'f/5.6', conditions: 'Paesaggi, maggiore profondità', iso: '100-200', shutter: '1/60-1/250' },
            { value: 'f/8', conditions: 'Massima nitidezza, HDR', iso: '100', shutter: '1/30-1/125' }
        ],
        shutter: [
            { value: '1/1000+', conditions: 'Azione veloce, sport', iso: '400-800', aperture: 'f/1.8-4' },
            { value: '1/125-1/500', conditions: 'Uso generale', iso: '100-400', aperture: 'f/2.8-5.6' },
            { value: '1/60-1/125', conditions: 'Soggetti statici', iso: '100-200', aperture: 'f/4-8' },
            { value: '<1/30', conditions: 'Richiesto treppiede', iso: '100', aperture: 'f/5.6-8' }
        ],
        scenes: [
            { value: 'Paesaggio', settings: 'f/8, ISO 100, bracketing se necessario' },
            { value: 'Street', settings: 'f/5.6, ISO 400, 1/125s' },
            { value: 'Poca Luce', settings: 'f/1.8, ISO 800, 1/60s' },
            { value: 'HDR', settings: 'f/8, ISO 100, ±2 stop' }
        ]
    },
    en: {
        aperture: [
            { value: 'f/1.8', conditions: 'Low light, bokeh effect', iso: '100-400', shutter: '1/60-1/250' },
            { value: 'f/2.8-4', conditions: 'General purpose, portraits', iso: '100-400', shutter: '1/125-1/500' },
            { value: 'f/5.6', conditions: 'Landscapes, more depth', iso: '100-200', shutter: '1/60-1/250' },
            { value: 'f/8', conditions: 'Maximum sharpness, HDR', iso: '100', shutter: '1/30-1/125' }
        ],
        shutter: [
            { value: '1/1000+', conditions: 'Fast action, sports', iso: '400-800', aperture: 'f/1.8-4' },
            { value: '1/125-1/500', conditions: 'General purpose', iso: '100-400', aperture: 'f/2.8-5.6' },
            { value: '1/60-1/125', conditions: 'Static subjects', iso: '100-200', aperture: 'f/4-8' },
            { value: '<1/30', conditions: 'Tripod required', iso: '100', aperture: 'f/5.6-8' }
        ],
        scenes: [
            { value: 'Landscape', settings: 'f/8, ISO 100, bracket if needed' },
            { value: 'Street', settings: 'f/5.6, ISO 400, 1/125s' },
            { value: 'Low Light', settings: 'f/1.8, ISO 800, 1/60s' },
            { value: 'HDR', settings: 'f/8, ISO 100, ±2 stops' }
        ]
    }
};

/**
 * Calculates aperture segments states based on aperture value
 * @param {string} value - The aperture value (e.g., 'f/1.8')
 * @returns {string[]} Array of segment states ('active', 'past', or '')
 */
function getApertureSegments(value) {
    const apertures = ['1.8', '2.8', '4', '5.6', '8'];
    const currentValue = parseFloat(value.replace('f/', '').split('-')[0]);
    const currentIndex = apertures.findIndex(a => parseFloat(a) >= currentValue);
    
    return apertures.map((a, index) => {
        if (index === currentIndex) return 'active';
        if (index < currentIndex) return 'past';
        return '';
    });
}

/**
 * Calculates aperture progress percentage
 * @param {string} value - The aperture value (e.g., 'f/1.8')
 * @returns {number} Progress percentage (0-100)
 */
function getApertureProgress(value) {
    const number = parseFloat(value.replace('f/', '').split('-')[0]);
    return Math.max(0, Math.min(100, (8 - number) / (8 - 1.8) * 100));
}

/**
 * Calculates ISO progress percentage
 * @param {string} value - The ISO value (e.g., '100-400')
 * @returns {number} Progress percentage (0-100)
 */
function getISOProgress(value) {
    const number = parseInt(value.split('-')[0]);
    return Math.max(0, Math.min(100, (number - 100) / (800 - 100) * 100));
}

/**
 * Toggles between Italian and English languages
 */
function toggleLanguage() {
    currentLanguage = currentLanguage === 'it' ? 'en' : 'it';
    showSection(currentSection);
}

// Export functions and variables
export {
    data,
    currentLanguage,
    currentSection,
    getApertureSegments,
    getApertureProgress,
    getISOProgress,
    toggleLanguage
};
