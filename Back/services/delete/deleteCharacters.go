package delete

import dbController "apiBack/db/controllers"

func DeleteCharacter(CharacterID string) error {

	err := dbController.DeleteCharacter(CharacterID)

	if err != nil {
		return err
	}

	return nil
}
