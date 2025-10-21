const crypto = require("crypto")

function calculateSHA256(str) {
    return crypto.createHash("sha256").update(str).digest("hex");
}

function isPalindrome(str) {
    const cleaned = str.toLowerCase().replace(/\s/g, '');
    const reversed = cleaned.split('').reverse().join('');
    return cleaned === reversed;
}

function countUniqueCharacters(str) {
    return new Set(str).size;
}

function countWords(str) {
    const trimmed = str.trim();
    if (trimmed.length === 0) return 0;
    return trimmed.split(/\s+/).filter(word => word.length > 0).length;
}

function getCharacterFrequencyMap(str) {
    const frequencyMap = {};
    for (const char of str) {
        frequencyMap[char] = (frequencyMap[char] || 0) + 1;
    }
    return frequencyMap;
}

function analyzeString(value) {
    return {
        length: value.length,
        is_Palindrome: isPalindrome(value),
        unique_characters: countUniqueCharacters(value),
        word_count: countWords(value),
        sha256_hash: calculateSHA256(value),
        character_frequency_map: getCharacterFrequencyMap(value)
    };
}