package c_get

import (
	"apiBack/services/get"

	"github.com/gin-gonic/gin"
)

func GetAvatarById(c *gin.Context) {

	id := c.Param("id")

	avatar, err := get.GetAvatarById(id)

	if err != nil {
		// log.Panic(err)
		c.JSON(404, gin.H{
			"message": "Fail get data",
		})
		return
	}

	c.JSON(200, gin.H{
		"message": "Obtained avata successfully",
		"avatars": avatar,
	})

}
