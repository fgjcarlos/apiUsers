package c_get

import (
	"apiBack/services/get"

	"github.com/gin-gonic/gin"
)

func GetAllCharacters(c *gin.Context) {

	var message string
	Characters, err := get.GetCharacters()

	if err != nil {
		// log.Panic(err)
		c.JSON(404, gin.H{
			"message": "Fail get data",
		})
		return
	}

	if Characters != nil {
		message = "Obtained Characters list successfully"
	} else {
		message = "There is no record yet of that data"
	}

	c.JSON(200, gin.H{
		"message":    message,
		"characters": Characters,
	})
}
