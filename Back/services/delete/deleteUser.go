package delete

import dbController "apiBack/db/controllers"

func DeleteUser(userID string) error {

	err := dbController.DeleteUser(userID)

	if err != nil {
		return err
	}

	return nil

}
