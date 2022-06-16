package routes

import (
	"apiBack/controllers/c_delete"
	"apiBack/controllers/c_get"
	"apiBack/controllers/c_post"
	"apiBack/controllers/c_update"

	jwt "github.com/appleboy/gin-jwt/v2"

	"github.com/gin-gonic/gin"
)

func RoutesUser(r *gin.Engine, mwAuth *jwt.GinJWTMiddleware) {
	usersGroup := r.Group("/user")
	{
		usersGroup.GET("/characters/:id", mwAuth.MiddlewareFunc(), c_get.GetCharactersByUser)
		usersGroup.GET("/info", mwAuth.MiddlewareFunc(), c_get.GetUserInfo)
		usersGroup.GET("/all", c_get.GetNamesUsers)
		usersGroup.GET("/refresh_token", mwAuth.RefreshHandler)
		usersGroup.POST("/register", c_post.RegisterUser)
		usersGroup.POST("/login", mwAuth.LoginHandler)
		usersGroup.PATCH("/update_profile", mwAuth.MiddlewareFunc(), c_update.UpdateUserProfile)
		usersGroup.DELETE("/character/:id", mwAuth.MiddlewareFunc(), c_delete.DeleteCharacter)
	}

}
