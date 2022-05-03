package post

import (
	dbController "apiBack/db/controllers"
	u "apiBack/db/models"
)

func AddCharacter(Character u.Character) error {

	err := dbController.Create(Character)

	if err != nil {
		return err
	}

	return nil
}
