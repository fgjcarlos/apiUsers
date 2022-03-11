package get

import (
	dbController "apiBack/db/controllers"
	a "apiBack/db/models"
)

func GetAvatars() (a.Avatars, error) {

	avatars, err := dbController.ReadAvatars()

	if err != nil {
		return avatars, err
	}

	// c.JSON(200, gin.H{
	// 	"message": avatars,
	// })

	return avatars, nil

}
