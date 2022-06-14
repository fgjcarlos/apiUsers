import { urlAvatars } from "utils/globalVars"

export const getAvatars = async() => {
    const res = await fetch(urlAvatars)
    return await res.json()
}