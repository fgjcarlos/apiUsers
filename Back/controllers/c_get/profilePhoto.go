package c_get

import (
	"apiBack/services/get"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func GetAllProfilePhotos(c *gin.Context) {

	profilePhotos, err := get.GetProfilePhotos()

	if err != nil {
		// log.Panic(err)
		c.JSON(404, gin.H{
			"message": "Fail get data",
		})
		return
	}

	c.JSON(200, gin.H{
		"message":       "Obtained profile photos successfully",
		"profilePhotos": profilePhotos,
	})
}

func GetProfilePhotosById(c *gin.Context) {

	id := c.Param("id")

	oid, _ := primitive.ObjectIDFromHex(id)

	profilePhoto, err := get.GetProfilePhoto(oid)

	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, gin.H{"profilePhoto": profilePhoto})

}
