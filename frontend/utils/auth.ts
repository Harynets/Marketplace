export const isUserAuthenticated = async (retry = true): Promise<boolean> => {
    let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/is_user_authenticated/`, {
        method: "GET",
        credentials: "include",

        headers: {
            "Content-type": "application/json",
        },
    });
    if (res.status === 401 && retry) {
        if (await refreshToken()) {
            return await isUserAuthenticated(false);
        }
    }

    return res.status === 200;
};

export const refreshToken = async () => {
    let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/refresh/`, {
        method: "POST",
        credentials: "include",

        headers: {
            "Content-type": "application/json",
        },
    });
    return res.status === 200;
};

export const login = async (email: string, password: string) => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/token/`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
            email: email,
            password: password,
        }),
        headers: {
            "Content-type": "application/json",
        },
    });
};
