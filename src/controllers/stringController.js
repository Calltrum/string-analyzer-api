const { analyzeString } = require('../utils/stringAnalyzer');
const storage = require('../utils/storage');
const { applyFilters, validateFilters } = require('../utils/filters');
const { parseNaturalLanguage, hasConflictingFilters } = require('../utils/naturalLanguageParser');

/**
 * POST /strings - Create/Analyze a new string
 */
exports.createString = (req, res) => {
    console.log('========== CREATE STRING CALLED ==========');
    console.log('Request body:', req.body);
    console.log('Request body type:', typeof req.body);
    console.log('Value:', req.body?.value);
    console.log('Value type:', typeof req.body?.value);
    console.log('==========================================');

    try {
        const { value } = req.body;

        // Check if value field exists
        if (value === undefined || value === null) {
            console.log('❌ Missing value field - returning 400');
            return res.status(400).json({
                error: 'Bad Request',
                message: 'Missing "value" field'
            });
        }

        // Check if value is a string
        if (typeof value !== 'string') {
            console.log('❌ Invalid type - returning 422');
            return res.status(422).json({
                error: 'Unprocessable Entity',
                message: 'Invalid data type for "value" (must be string)'
            });
        }

        // Check if string already exists
        if (storage.stringExists(value)) {
            console.log('❌ Duplicate - returning 409');
            return res.status(409).json({
                error: 'Conflict',
                message: 'String already exists in the system'
            });
        }

        // Analyze the string
        const properties = analyzeString(value);

        // Store the string
        const result = storage.storeString(value, properties);

        console.log('✅ Success - returning 201');
        // Return the created resource
        return res.status(201).json(result);

    } catch (error) {
        console.error('Error in createString:', error);
        return res.status(500).json({
            error: 'Internal Server Error',
            message: 'An unexpected error occurred'
        });
    }
};
exports.getString = (req, res) => {
    try {
        const { string_value } = req.params;

        // Look up the string
        const result = storage.getStringByValue(string_value);

        if (!result) {
            return res.status(404).json({
                error: 'Not Found',
                message: 'String does not exist in the system'
            });
        }

        return res.status(200).json(result);

    } catch (error) {
        console.error('Error in getString:', error);
        return res.status(500).json({
            error: 'Internal Server Error',
            message: 'An unexpected error occurred'
        });
    }
};

/**
 * GET /strings - Get all strings with optional filtering
 */
exports.getAllStrings = (req, res) => {
    try {
        const filters = req.query;

        // Validate filters
        const validationErrors = validateFilters(filters);
        if (validationErrors.length > 0) {
            return res.status(400).json({
                error: 'Bad Request',
                message: 'Invalid query parameter values or types',
                details: validationErrors
            });
        }

        // Get all strings
        let strings = storage.getAllStrings();

        // Apply filters if provided
        if (Object.keys(filters).length > 0) {
            strings = applyFilters(strings, filters);
        }

        return res.status(200).json({
            data: strings,
            count: strings.length,
            filters_applied: filters
        });

    } catch (error) {
        console.error('Error in getAllStrings:', error);
        return res.status(500).json({
            error: 'Internal Server Error',
            message: 'An unexpected error occurred'
        });
    }
};

/**
 * GET /strings/filter-by-natural-language - Filter using natural language
 */
exports.filterByNaturalLanguage = (req, res) => {
    try {
        const { query } = req.query;

        // Check if query parameter exists
        if (!query) {
            return res.status(400).json({
                error: 'Bad Request',
                message: 'Missing "query" parameter'
            });
        }

        // Parse the natural language query
        const parsedFilters = parseNaturalLanguage(query);

        // Check for conflicting filters
        if (hasConflictingFilters(parsedFilters)) {
            return res.status(422).json({
                error: 'Unprocessable Entity',
                message: 'Query parsed but resulted in conflicting filters',
                parsed_filters: parsedFilters
            });
        }

        // Check if we could parse anything meaningful
        if (Object.keys(parsedFilters).length === 0) {
            return res.status(400).json({
                error: 'Bad Request',
                message: 'Unable to parse natural language query'
            });
        }

        // Get all strings and apply filters
        let strings = storage.getAllStrings();
        strings = applyFilters(strings, parsedFilters);

        return res.status(200).json({
            data: strings,
            count: strings.length,
            interpreted_query: {
                original: query,
                parsed_filters: parsedFilters
            }
        });

    } catch (error) {
        console.error('Error in filterByNaturalLanguage:', error);
        return res.status(500).json({
            error: 'Internal Server Error',
            message: 'An unexpected error occurred'
        });
    }
};

/**
 * DELETE /strings/:string_value - Delete a specific string
 */
exports.deleteString = (req, res) => {
    try {
        const { string_value } = req.params;

        // Try to delete the string
        const deleted = storage.deleteStringByValue(string_value);

        if (!deleted) {
            return res.status(404).json({
                error: 'Not Found',
                message: 'String does not exist in the system'
            });
        }

        // Return 204 No Content (no response body)
        return res.status(204).send();

    } catch (error) {
        console.error('Error in deleteString:', error);
        return res.status(500).json({
            error: 'Internal Server Error',
            message: 'An unexpected error occurred'
        });
    }
};