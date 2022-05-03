package c_delete

import (
	"apiBack/services/delete"
	"apiBack/services/update"

	jwt "github.com/appleboy/gin-jwt/v2"
	"github.com/gin-gonic/gin"
)

func DeleteCharacter(c *gin.Context) {

	// Get id from url
	id := c.Param("id")

	claims := jwt.ExtractClaims(c)
	userID := claims["_id"].(string)

	// Delete character
	err := delete.DeleteCharacterById(id)

	if err != nil {
		c.JSON(500, gin.H{
			"message": "Error delete character",
			"error":   err.Error(),
		})
		return
	}

	//Update quantityCharacters in this user
	_, err = update.UserUpdateQuantityCharacters(userID, -1)

	if err != nil {
		c.JSON(500, gin.H{
			"message": "Fail to update quantityCharacters",
		})
		return
	}

	c.JSON(200, gin.H{
		"message": "Character deleted",
	})
}
