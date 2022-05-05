package post

import (
	dbController "apiBack/db/controllers"
	"apiBack/db/models"
)

func AddProfilePhoto(profilePhoto models.ProfilePhoto) error {

	err := dbController.CreateProfilePhoto(profilePhoto)

	if err != nil {
		return err
	}

	return nil
}
