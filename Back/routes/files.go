package routes

import (
	"apiBack/controllers/c_post"

	jwt "github.com/appleboy/gin-jwt/v2"
	"github.com/gin-gonic/gin"
)

func RoutesFiles(r *gin.Engine, mwAuth *jwt.GinJWTMiddleware) {
	r.MaxMultipartMemory = 8 << 20 // 8 MiB
	// Static files
	r.Static("/static", "./media/")
	r.StaticFile("/favicon.ico", "./resources/favicon.ico")

	// *Group of uploads, endpoint "UPLOAD"
	// TODO --> Add a middelware type acces key
	r.POST("/upload", mwAuth.MiddlewareFunc(), c_post.UploadFile)

}
