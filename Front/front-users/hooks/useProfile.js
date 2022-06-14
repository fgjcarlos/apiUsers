import { getUser, deleteUserCharacter, getUserCharacters } from "services/users";
import { throwSuccessToast } from "utils/toast";

const { useEffect, useState } = require("react");
const { useDispatch, useSelector } = require("react-redux");

export const useProfile = (router) => {
    const userLogin = useSelector((state) => state.login);
    const character = useSelector((state) => state.character);
    const [charactersUsers, setCharactersUsers] = useState(null);
    const dispatch = useDispatch();
    const [spinner, setSpinner] = useState(false);
    const [updateUser, setUpdateUser] = useState(true);

    useEffect(() => {
        let isSubscribed = true;

        const getInfoUser = async() => {
            setSpinner(true);

            // Get info, characters and user
            const [characters, user] = await Promise.all([
                getUserCharacters(userLogin.id),
                getUser(),
            ]);

            if (user) {
                dispatch({ type: "login", payload: user });
            }
            setCharactersUsers(characters);
            setSpinner(false);
            setUpdateUser(false);
        };

        if (userLogin && isSubscribed && updateUser) {
            getInfoUser();
        }

        if (!userLogin && charactersUsers) {
            router.push("/login");
            return null;
        }

        return () => (isSubscribed = false);
    }, [updateUser, router, userLogin]); // eslint-disable-line react-hooks/exhaustive-deps

    const handleModifyCharacter = (id) => {
        router.push(`/editCharacter/${id}`);
    };

    const handledeleteUserCharacter = async(id) => {

        const response = await deleteUserCharacter(id)

        if (response.status === 200) {
            throwSuccessToast("Character deleted successfully", 2000);
            setUpdateUser(true);
            // Reset modal confirm DELETE
            dispatch({ type: "@modalConfirm/reset" });
        }
    };

    const handleOperationsCharacter = () => {
        switch (character.action) {
            case "modify":
                handleModifyCharacter(character.id);
                break;
            case "delete":
                handledeleteUserCharacter(character.id);
                break;
            default:
                break;
        }
    };

    return [spinner, charactersUsers, handleOperationsCharacter, setUpdateUser];
};