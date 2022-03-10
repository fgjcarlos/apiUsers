package update

import (
	dbController "apiBack/db"
	u "apiBack/db/models"
)

func UpdateUser(user u.User, userID string) error {

	err := dbController.UpdateUser(user, userID)

	if err != nil {
		return err
	}

	// c.JSON(200, gin.H{
	// 	"message": "Updated user succesfully",
	// })

	return nil

}
