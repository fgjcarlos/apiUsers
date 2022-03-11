package update

import (
	dbController "apiBack/db/controllers"
	u "apiBack/db/models"
)

func UpdateCharacter(Character u.Character, CharacterID string) error {

	err := dbController.UpdateCharacter(Character, CharacterID)

	if err != nil {
		return err
	}

	return nil
}
