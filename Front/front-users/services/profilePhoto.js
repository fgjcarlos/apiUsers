import { urlProfilePhotos } from "utils/globalVars";

export const getProfilePhotos = async() => {
    const response = await fetch(urlProfilePhotos);

    return await response.json();
};