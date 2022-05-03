package c_post

import (
	db "apiBack/db/controllers"
	"apiBack/db/models"
	"apiBack/services/post"
	"apiBack/services/update"
	"time"

	jwt "github.com/appleboy/gin-jwt/v2"
	"github.com/gin-gonic/gin"
)

func AddCharacter(c *gin.Context) {

	var character models.Character

	err := c.BindJSON(&character)

	claims := jwt.ExtractClaims(c)
	userID := claims["_id"].(string)

	if err != nil {
		c.JSON(400, gin.H{
			"message": "No correct data",
		})
		return
	}

	// Save in DB
	character.ID, err = db.GenerateCharacterID()
	character.CreatedAt = time.Now()
	character.UpdatedAt = time.Now()

	err = post.AddCharacter(character)

	if err != nil {
		c.JSON(500, gin.H{
			"message": "Fail to save in db",
		})
		return
	}

	//Update quantityCharacters in this user
	_, err = update.UserUpdateQuantityCharacters(userID, 1)

	if err != nil {
		c.JSON(500, gin.H{
			"message": "Fail to update quantityCharacters",
		})
		return
	}

	c.JSON(200, gin.H{
		"message": "The character has been saved in the database correctly",
	})

}
