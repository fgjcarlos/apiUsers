package main

import (
	"apiBack/db"
	"apiBack/db/models"
	mw "apiBack/middelwares"
	"apiBack/routes"

	"fmt"
	"log"
	"os"

	jwt "github.com/appleboy/gin-jwt"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"github.com/unrolled/secure"
)

func init() {
	db.Init()
}

func main() {

	// db.Init()
	// Ping mongoDB with Ping method
	db.Ping()

	// Load var env
	// pathEnvFile := "/home/fgjcarlos/MEGAsync/DesarrolloWeb/CURSOS/apiUsers/Back/.env"
	errDotenv := godotenv.Load(".env")

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

	routes.InitRoutes(r, mwAuth)
	// r.GET("/", homePage)

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

func helloHandler(c *gin.Context) {
	claims := jwt.ExtractClaims(c)
	user, _ := c.Get("_id")
	c.JSON(200, gin.H{
		"userID":   claims["_id"],
		"userName": user.(*models.User).Name,
		"text":     "Hello World.",
	})
}
