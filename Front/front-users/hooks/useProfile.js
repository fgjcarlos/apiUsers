import { serverHost } from "utils/globalVars";
import { throwSuccessToast } from "utils/toast";

const { useEffect, useState, useMemo } = require("react");
const { useDispatch, useSelector } = require("react-redux");

export const useProfile = (router) => {
  const userLogin = useSelector((state) => state.login);
  const character = useSelector((state) => state.character);
  const [charactersUsers, setCharactersUsers] = useState(null);
  const dispatch = useDispatch();
  const [spinner, setSpinner] = useState(false);
  const [updateUser, setUpdateUser] = useState(false);
  const [switchUpUser, setSwitchUpUser] = useState(false);

  const handleModifyCharacter = (id) => {
    router.push(`/editCharacter/${id}`);
  };

  const handleDeleteCharacter = async (id) => {
    const response = await fetch(`${serverHost}/user/character/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response.status === 200) {
      throwSuccessToast("Character deleted successfully", 2000);
      setUpdateUser(true);
      setSwitchUpUser(true)
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
        handleDeleteCharacter(character.id);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    let isSubscribed = true;

    const token = localStorage.getItem("token");

    const getCharacters = async () => {
      setSpinner(true);
      setSwitchUpUser(true)

      const response = await fetch(
        `${serverHost}/user/characters/${userLogin.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { characters } = await response.json();

      // Update user in login
      const resUserInfo = await fetch(`${serverHost}/user/info`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const { user } = await resUserInfo.json();

      if (resUserInfo.ok && user) {
        dispatch({ type: "login", payload: user });
      }
      setCharactersUsers(characters);
      setSpinner(false);
      setUpdateUser(false);
    };

    if (userLogin && isSubscribed && !switchUpUser) {
      getCharacters();
    }

    if (!userLogin && charactersUsers) {
      router.push("/login");
      return null;
    }

    return () => (isSubscribed = false);
  }, [updateUser, router, userLogin]); // eslint-disable-line react-hooks/exhaustive-deps

  return [spinner, charactersUsers, handleOperationsCharacter];
};
