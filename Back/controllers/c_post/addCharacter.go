package c_post

import (
	db "apiBack/db/controllers"
	"apiBack/db/models"
	"apiBack/services/post"

	"github.com/gin-gonic/gin"
)

func AddCharacter(c *gin.Context) {

	var character models.Character

	err := c.BindJSON(&character)

	// TODO -> Add ID

	if err != nil {
		c.JSON(400, gin.H{
			"message": "No correct data",
		})
		return
	}

	// Save in DB

	character.ID, err = db.GenerateCharacterID()
	err = post.AddCharacter(character)

	if err != nil {
		c.JSON(500, gin.H{
			"message": "Fail to save in db",
		})
		return
	}

	c.JSON(200, gin.H{
		"message": "The character has been saved in the database correctly",
	})

}
