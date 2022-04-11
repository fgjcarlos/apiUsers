package get

import (
	dbController "apiBack/db/controllers"
	"apiBack/db/models"
)

func GetNamesUsers() ([]models.UserName, error) {

	users, err := dbController.ReadNamesUsers()

	if err != nil {
		return users, err
	}

	return users, nil

}
