function applyFilters(strings, filters) {
    let filtered = [...strings];
    if (filters.is_palindrome !== undefined) {
        const isPalin = filters.is_palindrome === "true";
        filtered = filtered.filter(s => s.properties.is_palindrome === isPalin);
    }

    return filtered;
}

function validateFilters(filters) {
    const validKeys = ['is_palindrome'];
    const invalidKeys = Object.keys(filters).filter(key => !validKeys.includes(key));

    if (invalidKeys.length > 0) {
        return { valid: false, message: `Invalid filter(s): ${invalidKeys.join(', ')}` };
    }

    return { valid: true };
}

module.exports = {
    applyFilters,
    validateFilters
};