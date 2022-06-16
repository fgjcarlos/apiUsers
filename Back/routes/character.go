package routes

import (
	"apiBack/controllers/c_get"
	"apiBack/controllers/c_post"
	"apiBack/controllers/c_update"

	jwt "github.com/appleboy/gin-jwt/v2"

	"github.com/gin-gonic/gin"
)

func RoutesCharacter(r *gin.Engine, mwAuth *jwt.GinJWTMiddleware) {
	charactersGroup := r.Group("/character")
	{
		charactersGroup.GET("/all", c_get.GetAllCharacters)
		charactersGroup.GET("/:id", c_get.GetCharacterById)
		// TODO -> Add mw for max. quantity of characters <= 3
		charactersGroup.POST("/add", mwAuth.MiddlewareFunc(), c_post.AddCharacter)
		charactersGroup.PATCH("/modify", mwAuth.MiddlewareFunc(), c_update.CharacterUpdate)

	}

}
