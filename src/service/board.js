export const boardPostRequest = async (getToken, form) => {
    const response = await fetch('/board', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            Authorization: 'Bearer ' + getToken.accessToken,
        },
        body: JSON.stringify(form)
    });

    if (response.status !== 200) {
        throw await response.json();
    }

    return response.json();
};

export const boardGetRequest = async () => {
    const response = await fetch('/board');

    if (response.status !== 200) {
        throw await response.json();
    }

    return response.json();
};