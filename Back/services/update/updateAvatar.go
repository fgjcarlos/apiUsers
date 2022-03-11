package update

import (
	dbController "apiBack/db/controllers"
	a "apiBack/db/models"
)

func UpdateAvatar(avatar a.Avatar, avatarID string) error {

	err := dbController.UpdateAvatar(avatar, avatarID)

	if err != nil {
		return err
	}

	return nil
}
