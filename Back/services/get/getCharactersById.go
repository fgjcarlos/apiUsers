package get

import (
	dbController "apiBack/db/controllers"
	u "apiBack/db/models"
)

func GetCharacterById(CharacterID string) (u.Character, error) {

	Character, err := dbController.ReadCharacterById(CharacterID)

	if err != nil {
		return Character, err
	}

	return Character, nil
}
