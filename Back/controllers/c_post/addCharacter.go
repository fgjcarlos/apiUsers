package c_post

import (
	db "apiBack/db/controllers"
	"apiBack/db/models"
	"apiBack/services/post"
	"fmt"
	"time"

	jwt "github.com/appleboy/gin-jwt/v2"
	"github.com/gin-gonic/gin"
)

func AddCharacter(c *gin.Context) {

	var character models.Character
	var user models.User

	err := c.BindJSON(&character)

	claims := jwt.ExtractClaims(c)
	userID := claims["_id"].(string)
	fmt.Println("id", claims)

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
	// err = post.UpdateUser(character.UserID)

	user, err = db.FindUserAndUpdateQuantityCharacters(userID)

	fmt.Println("user", user)

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
