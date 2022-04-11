package get

import (
	dbController "apiBack/db/controllers"
	"apiBack/db/models"
)

func GetUser(userIn models.User) (models.User, error) {

	user, err := dbController.ReadUser(userIn)

	if err != nil {
		return user, err
	}

	return user, nil

}
