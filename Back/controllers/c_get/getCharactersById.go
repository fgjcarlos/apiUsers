package c_get

import (
	"apiBack/services/get"

	"github.com/gin-gonic/gin"
)

func GetCharacterById(c *gin.Context) {

	id := c.Param("id")

	Character, err := get.GetCharacterById(id)

	if err != nil {
		// log.Panic(err)
		c.JSON(404, gin.H{
			"message": "Fail get data",
		})
		return
	}

	c.JSON(200, gin.H{
		"message":   "Obtained Character successfully",
		"Character": Character,
	})

}
