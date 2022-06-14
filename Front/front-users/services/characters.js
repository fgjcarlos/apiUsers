import {
    urlCharacter,
    urlCharacterCreate,
    urlCharacterModify,
    urlCharacters,
} from "utils/globalVars";

export const getCharacter = async(id) => {
    const res = await fetch(`${urlCharacter}${id}`);
    return await res.json();
};

export const getCharacters = async() => {
    const res = await fetch(urlCharacters);
    return await res.json();
};

export const modifyCharacter = async(body) => {
    return await fetch(urlCharacterModify, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({...body }),
    });
};

export const createCharacter = async(body) => {
    return await fetch(urlCharacterCreate, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({...body }),
    });
};