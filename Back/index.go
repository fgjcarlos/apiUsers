package main

import (
	"apiBack/controllers/c_get"
	"apiBack/controllers/c_post"
	mw "apiBack/middelwares"

	"fmt"
	"log"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"github.com/unrolled/secure"
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

	// r.Use(LoadTls())

	// Register the middleware
	r.Use(mw.CORSMiddleware())
	r.SetTrustedProxies(nil)

	// Instance of the auth middleware
	mwAuth, errAuth := mw.Jwt()

	if errAuth != nil {
		log.Fatal("Instance mwAuth Error:" + errAuth.Error())
	}

	// Init middelware auth
	errInit := mwAuth.MiddlewareInit()

	if errInit != nil {
		log.Fatal("authMiddleware.MiddlewareInit() Error:" + errInit.Error())
	}

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
		avatarGroup.POST("/add", c_post.AddAvatar)
	}

	// *Endpoint "CHARACTER"
	charactersGroup := r.Group("/character")
	{
		charactersGroup.GET("/all", c_get.GetAllCharacters)
		charactersGroup.GET("/:id", c_get.GetCharacterById)
		charactersGroup.POST("/add", c_post.AddCharacter)
	}

	// *Endopint "USER"
	usersGroup := r.Group("/user")
	{
		usersGroup.GET("/info", mwAuth.MiddlewareFunc(), c_get.GetUserInfo)
		usersGroup.GET("/all", c_get.GetNamesUsers)
		usersGroup.GET("/refresh_token", mwAuth.RefreshHandler)
		usersGroup.POST("/register", c_post.RegisterUser)
		usersGroup.POST("/login", mwAuth.LoginHandler)
	}

	r.GET("/", homePage)

	// Start server
	r.Run(fmt.Sprintf("%s:%s", HOST, PORT))
	// r.RunTLS(fmt.Sprintf("%s:%s", HOST, PORT), "./192.168.1.136.pem", "./192.168.1.136-key.pem")
}

func homePage(c *gin.Context) {

	c.JSON(200, gin.H{
		"message": "Home Page",
	})
}

func LoadTls() gin.HandlerFunc {
	return func(c *gin.Context) {
		middleware := secure.New(secure.Options{
			SSLRedirect: true,
			SSLHost:     "192.168.1.136:3001",
		})
		err := middleware.Process(c.Writer, c.Request)
		if err != nil {
			//If an error occurs, do not continue.
			fmt.Println(err)
			return
		}
		//Continue processing
		c.Next()
	}
}
