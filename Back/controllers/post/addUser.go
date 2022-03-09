package post

import (
	dbController "apiBack/db"
	u "apiBack/db/models"
)

func AddUser(user u.User) error {

	err := dbController.Create(user)

	if err != nil {
		return err
	}

	return nil
}
