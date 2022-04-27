package c_get

import (
	"apiBack/services/get"
	"fmt"

	"github.com/gin-gonic/gin"
)

func GetCharactersByUser(c *gin.Context) {

	// Get user name
	userName := c.Param("user")

	// Get characters by user id
	characters, err := get.GetCharactersByUser(userName)

	fmt.Println("Get characters by user:", userName)

	if err != nil {
		c.JSON(404, gin.H{
			"message": "Fail get data",
		})
		return
	}

	c.JSON(200, gin.H{
		"message":    "Obtained characters list successfully",
		"characters": characters,
	})
}
