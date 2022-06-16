package routes

import (
	"apiBack/controllers/c_get"
	"apiBack/controllers/c_post"

	"github.com/gin-gonic/gin"
)

func RoutesAvatar(r *gin.Engine) {

	avatarGroup := r.Group("/avatar")
	{
		avatarGroup.GET("/all", c_get.GetAllAvatars)
		avatarGroup.GET("/:id", c_get.GetAvatarById)
		avatarGroup.POST("/add", c_post.AddAvatar)
	}

}
