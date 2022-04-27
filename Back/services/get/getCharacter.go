package get

import (
	dbController "apiBack/db/controllers"
	"apiBack/db/models"
)

func GetCharactersByUser(user string) (models.Characters, error) {

	var characters models.Characters
	var err error

	characters, err = dbController.ReadCharacterByUser(user)

	if err != nil {
		return nil, err
	}

	return characters, nil

}
