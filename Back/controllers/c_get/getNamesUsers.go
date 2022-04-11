package c_get

import (
	"apiBack/services/get"

	"github.com/gin-gonic/gin"
)

func GetNamesUsers(c *gin.Context) {

	users, err := get.GetNamesUsers()

	if err != nil {
		c.JSON(500, gin.H{"message": "Fail to get names users"})
		return
	}

	c.JSON(200, gin.H{"users": users})

}
