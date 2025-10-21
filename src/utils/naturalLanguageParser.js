function parseNaturalLanguage(query) {
    const filters = {};
    const lowerQuery = query.toLowerCase();

    if (lowerQuery.includes("palindrom")) {
        filters.is_palindrome = true;
    }
    return filters;
}

function hasConflictingFilters(filters) {
    if (filters.min_length !== undefined && filters.max_length !== undefined) {
        if (filters.min_length > filters.max_length) {
            return true;
        }
    }
    return false;
}