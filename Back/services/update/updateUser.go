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

func FindUserAndUpdateQuantityCharacters(userID string) (models.User, error) {

	var user models.User
	var err error

	user, err = dbController.FindUserAndUpdateQuantityCharacters(userID)

	if err != nil {
		return user, err
	}

	return user, nil
}
