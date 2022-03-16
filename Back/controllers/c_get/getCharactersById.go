package c_get

import (
	"apiBack/services/get"
	"strconv"

	"github.com/gin-gonic/gin"
)

func GetCharacterById(c *gin.Context) {

	id := c.Param("id")

	idInt, err := strconv.Atoi(id)

	if err != nil {
		c.JSON(404, gin.H{"message": "Fail get data"})
		return
	}

	Character, err := get.GetCharacterById(idInt)

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
