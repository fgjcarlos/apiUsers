package update

import (
	dbController "apiBack/db"
	u "apiBack/db/models"
)

func UpdateUser(user u.User, userID int) error {

	err := dbController.UpdateUser(user, userID)

	if err != nil {
		return err
	}

	return nil
}
