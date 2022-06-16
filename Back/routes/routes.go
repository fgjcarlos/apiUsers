package routes

import (
	jwt "github.com/appleboy/gin-jwt/v2"
	"github.com/gin-gonic/gin"
)

func InitRoutes(r *gin.Engine, mwAuth *jwt.GinJWTMiddleware) {

	RoutesFiles(r, mwAuth)

	// Routes for Avatar
	RoutesAvatar(r)

	// Routes for User
	RoutesUser(r, mwAuth)

	// Routes for Character
	RoutesCharacter(r, mwAuth)

	// Routes for ProfilePhoto
	RoutesProfilePhoto(r)

}
