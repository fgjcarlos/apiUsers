package c_get

import (
	"apiBack/services/get"
	"strconv"

	"github.com/gin-gonic/gin"
)

func GetCharactersByUser(c *gin.Context) {

	// Get user id
	userID := c.Param("id")

	// Get characters by user id
	characters, err := get.GetCharactersByUserID(userID)

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
