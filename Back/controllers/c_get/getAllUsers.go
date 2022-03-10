package c_get

import (
	"apiBack/db/get"

	"github.com/gin-gonic/gin"
)

func GetAllUsers(c *gin.Context) {

	users, err := get.GetUsers()

	if err != nil {
		// log.Panic(err)
		c.JSON(404, gin.H{
			"message": "Fail get data",
		})
		return
	}

	c.JSON(200, gin.H{
		"message": "Obtained users list successfully",
		"avatars": users,
	})
}
