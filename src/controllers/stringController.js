exports.createString = (req, res) => {
    const { value } = req.body;

    if (value === undefined || value === null) {
        return res.status(400).json({ error: "Missing 'value' field" });
    }

    if (typeof value !== "string") {
        return res.status(422).json({ error: "Invalid data type" });
    }

    if (storage.stringExists(value)) {
        return res.status(409).json({ error: "String already exists" });
    }

    const properties = analyzeString(value);
    const result = storage.storeString(value, properties);

    return res.status(201).json(result);
}


exports.getString = (req, res) => {
    const { string_value } = req.params;
    const result = storage.getStringByValue(string_value);

    if (!result) {
        return res.status(404).json({ error: "String does not exist" });
    }
    return res.status(200).json(result);
}

exports.getAllStrings = (req, res) => {
    const filters = req.query;

    const validationErrors = validateFilters(filters);
    if (validationErrors.length > 0) {
        return res.status(400).json({ error: "Invalid parameters" });
    }

    return res.status(200).json({
        data: strings,
        count: strings.length,
        filters_applied: filters
    });
};

exports.filterByNaturalLanguage = (req, res) => {
    const { query } = req.query;

    if (!query) {
        return res.status(400).json({ error: "Missing 'query' parameter" });
    }

    const parsedFilters = parseNaturalLanguage(query);

    if (hasConflictingFilters(parsedFilters)) {
        return res.status(422).json({ error: "Conflicting filters" });
    }

    if (Object.keys(parsedFilters).length === 0) {
        return res.status(400).json({ error: "Unable to parse query" });
    }

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
};

exports.deleteString = (req, res) => {
    const { string_value } = req.params;
    const deleted = storage.deleteStringByValue(string_value);

    if (!deleted) {
        return res.status(404).json({ error: "String does not exist" });
    }

    return res.status(204).send();
};