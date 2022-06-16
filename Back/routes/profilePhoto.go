package routes

import (
	"apiBack/controllers/c_get"

	"github.com/gin-gonic/gin"
)

func RoutesProfilePhoto(r *gin.Engine) {

	profilePhotoGroup := r.Group("/profilePhoto")
	{
		profilePhotoGroup.GET("/all", c_get.GetAllProfilePhotos)
		profilePhotoGroup.GET("/:id", c_get.GetProfilePhotosById)
	}

}
