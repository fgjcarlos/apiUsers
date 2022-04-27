package c_delete

import (
	"apiBack/services/delete"

	"github.com/gin-gonic/gin"
)

func DeleteCharacter(c *gin.Context) {

	// Get id from url
	id := c.Param("id")

	// Delete character
	err := delete.DeleteCharacter(id)

	if err != nil {
		c.JSON(500, gin.H{
			"message": "Error delete character",
			"error":   err.Error(),
		})
		return
	}

	c.JSON(200, gin.H{
		"message": "Character deleted",
	})
}
