package get

import (
	dbController "apiBack/db/controllers"
	u "apiBack/db/models"
)

func GetCharacters() (u.Characters, error) {

	Characters, err := dbController.ReadCharacters()

	if err != nil {
		return Characters, err
	}

	return Characters, nil

}
