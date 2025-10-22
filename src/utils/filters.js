function applyFilters(strings, filters) {
    let filtered = [...strings];

    // Filter by is_palindrome
    if (filters.is_palindrome !== undefined) {
        const isPalin = filters.is_palindrome === "true" || filters.is_palindrome === true;
        filtered = filtered.filter(s => s.properties.is_palindrome === isPalin);
    }

    // Filter by min_length
    if (filters.min_length !== undefined) {
        const minLen = parseInt(filters.min_length);
        filtered = filtered.filter(s => s.properties.length >= minLen);
    }

    // Filter by max_length
    if (filters.max_length !== undefined) {
        const maxLen = parseInt(filters.max_length);
        filtered = filtered.filter(s => s.properties.length <= maxLen);
    }

    // Filter by word_count
    if (filters.word_count !== undefined) {
        const wordCount = parseInt(filters.word_count);
        filtered = filtered.filter(s => s.properties.word_count === wordCount);
    }

    // Filter by contains_character
    if (filters.contains_character !== undefined) {
        const char = filters.contains_character.toLowerCase();
        filtered = filtered.filter(s =>
            s.value.toLowerCase().includes(char)
        );
    }

    return filtered;
}

function validateFilters(filters) {
    const errors = [];
    const validKeys = ['is_palindrome', 'min_length', 'max_length', 'word_count', 'contains_character'];

    // Check for invalid keys
    for (const key in filters) {
        if (!validKeys.includes(key)) {
            errors.push(`Invalid filter parameter: ${key}`);
        }
    }

    // Validate is_palindrome (must be boolean-like)
    if (filters.is_palindrome !== undefined) {
        const val = filters.is_palindrome;
        if (val !== 'true' && val !== 'false' && val !== true && val !== false) {
            errors.push('is_palindrome must be a boolean (true/false)');
        }
    }

    // Validate min_length (must be a positive integer)
    if (filters.min_length !== undefined) {
        const val = parseInt(filters.min_length);
        if (isNaN(val) || val < 0) {
            errors.push('min_length must be a positive integer');
        }
    }

    // Validate max_length (must be a positive integer)
    if (filters.max_length !== undefined) {
        const val = parseInt(filters.max_length);
        if (isNaN(val) || val < 0) {
            errors.push('max_length must be a positive integer');
        }
    }

    // Validate word_count (must be a positive integer)
    if (filters.word_count !== undefined) {
        const val = parseInt(filters.word_count);
        if (isNaN(val) || val < 0) {
            errors.push('word_count must be a positive integer');
        }
    }

    // Validate contains_character (must be a single character)
    if (filters.contains_character !== undefined) {
        if (typeof filters.contains_character !== 'string' || filters.contains_character.length !== 1) {
            errors.push('contains_character must be a single character');
        }
    }

    // Check if min_length > max_length
    if (filters.min_length !== undefined && filters.max_length !== undefined) {
        const minLen = parseInt(filters.min_length);
        const maxLen = parseInt(filters.max_length);
        if (minLen > maxLen) {
            errors.push('min_length cannot be greater than max_length');
        }
    }

    return errors;
}

module.exports = {
    applyFilters,
    validateFilters
};