package get

import (
	dbController "apiBack/db"
	u "apiBack/db/models"
)

func GetUsers() (u.Users, error) {

	users, err := dbController.ReadUsers()

	if err != nil {
		return users, err
	}

	return users, nil

}
