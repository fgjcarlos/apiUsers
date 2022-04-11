package update

import (
	dbController "apiBack/db/controllers"
	"apiBack/db/models"
)

func UpdateUser(user models.User, userID string) error {

	err := dbController.UpdateUser(user, userID)

	if err != nil {
		return err
	}

	return nil

}
