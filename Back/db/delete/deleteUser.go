package delete

import dbController "apiBack/db"

func DeleteUser(userID int) error {

	err := dbController.DeleteUser(userID)

	if err != nil {
		return err
	}

	return nil
}
