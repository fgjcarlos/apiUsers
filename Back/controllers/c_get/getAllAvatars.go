package c_get

import (
	"apiBack/db/get"
	"log"

	"github.com/gin-gonic/gin"
)

func GetAllAvatars(c *gin.Context) {

	avatars, err := get.GetAvatars()

	if err != nil {
		log.Panic(err)
		c.JSON(500, gin.H{
			"message": "Fail get data",
		})
	}

	c.JSON(200, gin.H{
		"message": "Obtained avatar list successfully",
		"avatars": avatars,
	})
}
