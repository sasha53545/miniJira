export const tasksPostAsync = async (getToken, data) => {
    const response = await fetch('/task', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            Authorization: 'Bearer ' + getToken.accessToken,
        },
        body: JSON.stringify(data)
    });

    if (response.status !== 200) {
        throw await response.json();
    }

    return response.json();
};

export const tasksGetAsync = async () => {
    const response = await fetch('/task');

    if (response.status !== 200) {
        throw await response.json();
    }

    return response.json();
};