package delete

import dbController "apiBack/db/controllers"

func DeleteAvatar(avatarID string) error {

	err := dbController.DeleteAvatar(avatarID)

	if err != nil {
		return err
	}

	return nil
}
