package c_update

import (
	"apiBack/db/models"
	"apiBack/services/update"
	"fmt"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
)

func UpdateUserProfile(c *gin.Context) {

	var user models.User
	// var userValidator validators.ModelValidateUser
	// validator := validator.New()

	// # Get data
	err := c.BindJSON(&user)

	if err != nil {

		c.JSON(400, gin.H{
			"message": "No correct data",
		})
		return
	}

	// userValidator = validators.ModelValidateUser{
	// 	Name: user.Name,
	// }

	// // # Validate data
	// err = validator.Struct(userValidator)

	// if err != nil {
	// 	c.JSON(400, gin.H{
	// 		"message": "Error in validation data" + err.Error(),
	// 	})
	// 	return
	// }

	// # Assing data to newUser
	user.Name = strings.ToLower(user.Name)
	user.UpdatedAt = time.Now()

	fmt.Println("user", user)

	// # Update user
	err = update.UpdateUser(user)

	if err != nil {
		c.JSON(500, gin.H{"message": "Fail to update user", "error": err.Error()})
		return
	}

	c.JSON(200, gin.H{"message": "User updated"})

}
