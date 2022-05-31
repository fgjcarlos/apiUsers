package c_update

import (
	"apiBack/db/models"
	"apiBack/services/update"

	"github.com/gin-gonic/gin"
)

func CharacterUpdate(c *gin.Context) {

	var character models.Character

	err := c.BindJSON(&character)

	if err != nil || &character.ID == nil {

		c.JSON(400, gin.H{
			"message": "No correct data",
		})
		return
	}

	err = update.UpdateCharacter(character)

	if err != nil {
		c.JSON(500, gin.H{"message": "Fail to update character", "error": err.Error()})
		return
	}

	c.JSON(200, gin.H{"message": "Character updated"})

}
