package main

import (
	"apiBack/controllers/c_get"
	"apiBack/controllers/c_post"

	"fmt"
	"log"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {

	// Load var env
	pathEnvFile := "/home/fgjcarlos/Escritorio/DesarrolloWeb/CURSOS/apiUsers/Back/.env"
	errDotenv := godotenv.Load(pathEnvFile)

	if errDotenv != nil {
		log.Fatal("Error loading .env file")
	}

	var PORT = os.Getenv("PORT")
	var HOST = os.Getenv("HOST")

	r := gin.Default()

	r.Use(cors.Default())
	r.SetTrustedProxies(nil)

	r.MaxMultipartMemory = 8 << 20 // 8 MiB

	// Static files
	r.Static("/static", "./media/")
	r.StaticFile("/favicon.ico", "./resources/favicon.ico")

	// *Group of uploads, endpoint "UPLOAD"
	// TODO --> Add a middelware type acces key
	r.POST("/upload", c_post.UploadFile)

	// *Endpoint "AVATAR"
	avatarGroup := r.Group("/avatar")
	{
		avatarGroup.GET("/all", c_get.GetAllAvatars)
		avatarGroup.GET("/:id", c_get.GetAvatarById)
	}

	// *Endpoint "CHARACTERS"
	charactersGroup := r.Group("/character")
	{
		charactersGroup.GET("/all", c_get.GetAllCharacters)
		charactersGroup.GET("/:id", c_get.GetCharacterById)
		charactersGroup.POST("/add", c_post.AddCharacter)
	}

	// *Endopint "USERS"

	r.GET("/", homePage)

	// Start server
	r.Run(fmt.Sprintf("%s:%s", HOST, PORT))
}

func homePage(c *gin.Context) {

	c.JSON(200, gin.H{
		"message": "Home Page",
	})
}
