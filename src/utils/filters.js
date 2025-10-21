function applyFilters(strings, filters) {
    let filtered = [...strings];
    if (filters.is_palindrome !== undefined) {
        const isPalin = filters.is_palindrome === "true";
        filtered = filtered.filter(s => s.properties.is_palindrome === isPalin);
    }

    return filtered;
}