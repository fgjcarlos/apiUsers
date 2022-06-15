import {
    urlUserInfo,
    urlUserCharacter,
    urlUserCharacters,
    urlUserRegister,
    urlUserLogin,
    urlUserUpdate,
} from "utils/globalVars";

export const getUser = async() => {
    const token = localStorage.getItem("token");

    const resUserInfo = await fetch(urlUserInfo, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    const { user } = await resUserInfo.json();

    return user;
};

export const getUserCharacters = async(id) => {
    const res = await fetch(`${urlUserCharacters}${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });

    const { characters } = await res.json();

    return characters;
};

export const deleteUserCharacter = async(id) => {
    return await fetch(`${urlUserCharacter}${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
};

export const userRegister = async(body) => {
    return await fetch(urlUserRegister, {
        method: "POST",
        body: JSON.stringify({...body }),
    });
};

export const updateUser = async(body) => {
    return await fetch(urlUserUpdate, {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({...body }),
    });
}

export const userLogin = async(body) => {
    const res = await fetch(urlUserLogin, {
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({...body }),
    });

    const { token } = await res.json();

    return token;
};