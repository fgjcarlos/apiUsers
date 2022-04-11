package get

import (
	dbController "apiBack/db/controllers"
	a "apiBack/db/models"
)

func GetAvatarById(avatarID int) (a.Avatar, error) {

	avatar, err := dbController.ReadAvatarById(avatarID)

	if err != nil {
		return avatar, err
	}

	return avatar, nil

}
