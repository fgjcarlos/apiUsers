package c_get

import (
	"apiBack/db/get"
	"log"
	"strconv"

	"github.com/gin-gonic/gin"
)

func GetUserById(c *gin.Context) {

	id := c.Param("id")

	idUser, errInt := strconv.Atoi(id)

	if errInt != nil {
		log.Panic(errInt)
	}

	user, err := get.GetUserById(idUser)

	if err != nil {
		// log.Panic(err)
		c.JSON(404, gin.H{
			"message": "Fail get data",
		})
		return
	}

	c.JSON(200, gin.H{
		"message": "Obtained user successfully",
		"user":    user,
	})

}
