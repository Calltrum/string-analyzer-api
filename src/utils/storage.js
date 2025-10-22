const storage = new Map();

function storeString(value, properties) {
    const id = properties.sha256_hash;

    if (storage.has(id)) {
        return null;
    }

    const data = {
        id: id,
        value: value,
        properties: properties,
        created_at: new Date().toISOString()
    };

    storage.set(id, data);

    return data;
}

function getStringByValue(value) {
    for (const [id, data] of storage.entries()) {
        if (data.value === value) {
            return data;
        }
    }

    return null;
}

function getAllStrings() {
    return Array.from(storage.values());
}

function deleteStringByValue(value) {
    for (const [id, data] of storage.entries()) {
        if (data.value === value) {

            storage.delete(id);
            return true;
        }
    }


    return false;
}


function stringExists(value) {
    return getStringByValue(value) !== null;
}

module.exports = {
    storeString,
    getStringByValue,
    getAllStrings,
    deleteStringByValue,
    stringExists
};