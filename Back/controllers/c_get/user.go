package c_get

import (
	"apiBack/db/models"
	"apiBack/middelwares"
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

func GetUserInfo(c *gin.Context) {

	var userInfo models.User
	var err error

	id := middelwares.ExtractClaimsID(c)

	userInfo, err = get.GetUserById(id)

	if err != nil {
		// log.Panic(err)
		c.JSON(404, gin.H{
			"message": "Fail get data",
		})
		return
	}

	c.JSON(200, gin.H{
		"message": "Obtained user successfully",
		"user":    userInfo,
	})
}
