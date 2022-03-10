package get

import (
	dbController "apiBack/db"
	u "apiBack/db/models"
)

func GetUserById(userID string) (u.User, error) {

	user, err := dbController.ReadUserById(userID)

	if err != nil {
		return user, err
	}

	return user, nil
}
