export const dictionaryRequest = async (nameOfDictionary) => {
    const response = await fetch(`/dictionaries/${nameOfDictionary}`);

    if (response.status !== 200) {
        throw await response.json();
    }

    return response.json();
};