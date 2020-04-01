export const signInRequest = async (form) => {
    const response = await fetch('/auth/login', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(form)
    });

    if (response.status !== 200) {
        throw await response.json();
    }

    return response.json();
};

export const signUpRequest = async (form) => {
    const response = await fetch('/auth/register', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(form)
    });

    if (response.status !== 200) {
        throw await response.json();
    }

    return response.json();
};

export const updateTokensRequest = async (getToken) => {
    const response = await fetch('/auth/update-tokens', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            refreshToken: getToken.refreshToken
        })
    });

    if (response.status !== 200) {
        throw await response.json();
    }

    return response.json();
};