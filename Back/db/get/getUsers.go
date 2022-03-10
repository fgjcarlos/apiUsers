package get

import (
	dbController "apiBack/db"
	u "apiBack/db/models"

	"github.com/gin-gonic/gin"
)

func GetUsers(c *gin.Context) (u.Users, error) {

	users, err := dbController.ReadUsers()

	if err != nil {
		return users, err
	}

	c.JSON(200, gin.H{
		"message": users,
	})

	return users, nil

}
