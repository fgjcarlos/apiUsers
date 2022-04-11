package c_get

import (
	"apiBack/services/get"
	"strconv"

	"github.com/gin-gonic/gin"
)

func GetAvatarById(c *gin.Context) {

	id := c.Param("id")

	id_int, errConvers := strconv.Atoi(id)

	if errConvers != nil {
		c.JSON(400, gin.H{
			"message": "Fail to convert id",
		})
		return
	}

	avatar, err := get.GetAvatarById(id_int)

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
