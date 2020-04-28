export const signInAsync = async (form) => {
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

export const signUpAsync = async (form) => {
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

export const updateTokensAsync = async (getToken) => {
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

export const googleAuthAsync = async (id_token) => {
    const response = await fetch('/auth/google', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({"id_token": id_token})
    });

    if(response.status !== 200) {
        throw await response.json();
    }

    return response.json();
};
