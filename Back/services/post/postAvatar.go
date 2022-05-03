package post

import (
	dbController "apiBack/db/controllers"
	a "apiBack/db/models"
)

func AddAvatar(avatar a.Avatar) error {

	err := dbController.CreateAvatar(avatar)

	if err != nil {
		return err
	}

	return nil
}
