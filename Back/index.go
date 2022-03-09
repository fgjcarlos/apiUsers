package main

import (
	"apiBack/controllers/get"
	u "apiBack/utils"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
)

func main() {

	// Load var env
	u.LoadEnv()
	var PORT = os.Getenv("PORT")
	var HOST = os.Getenv("HOST")

	r := gin.Default()

	r.SetTrustedProxies(nil)

	r.MaxMultipartMemory = 8 << 20 // 8 MiB
	r.POST("/upload-avatar", func(c *gin.Context) {
		// Archivo individual
		file, _ := c.FormFile("file")
		log.Println(file.Filename)

		file.Filename = "firstNameAvatar"

		// Guarda el archivo recibido a un destino específico
		c.SaveUploadedFile(file, "/media/avatars")

		c.String(http.StatusOK, fmt.Sprintf("'%s' uploaded!", file.Filename))
	})

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
