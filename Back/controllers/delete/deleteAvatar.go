package delete

import dbController "apiBack/db"

func DeleteAvatar(avatarID string) error {

	err := dbController.DeleteAvatar(avatarID)

	if err != nil {
		return err
	}

	return nil
}
