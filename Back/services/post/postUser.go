package post

import (
	dbController "apiBack/db/controllers"
	u "apiBack/db/models"
	"fmt"
)

func AddUser(user u.User) error {

	err := dbController.CreateUser(user)

	if err != nil {
		fmt.Println("Fail to create user")
		return err
	}

	return nil
}
