package main

import (
	"apiBack/controllers/get"
	u "apiBack/utils"
	"fmt"
	"os"

	"github.com/gin-gonic/gin"
)

func main() {

	u.LoadEnv()

	// Load var env
	var PORT = os.Getenv("PORT")
	var HOST = os.Getenv("HOST")
	// var MONGO_COLLECTION = os.Getenv("MONGO_DATABASE")

	// Init db with 'users' collections
	// dbMongo.GetCollection(MONGO_COLLECTION)

	r := gin.Default()

	r.SetTrustedProxies(nil)

	r.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})

	r.GET("/home", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "Home page",
		})
	})

	r.GET("/users", func(c *gin.Context) {
		get.GetUsers(c)
	})

	// Start server
	r.Run(fmt.Sprintf("%s:%s", HOST, PORT)) // Sirve y escucha peticiones en 0.0.0.0:8080

	// now do something with s3 or whatever
}
