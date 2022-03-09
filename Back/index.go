package main

import (
	"apiBack/controllers/get"
	u "apiBack/utils"
	"fmt"
	"log"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {

	// Load var env
	u.LoadEnv()
	var PORT = os.Getenv("PORT")
	var HOST = os.Getenv("HOST")

	r := gin.Default()

	r.Use(cors.Default())
	r.SetTrustedProxies(nil)

	r.MaxMultipartMemory = 8 << 20 // 8 MiB

	r.POST("/upload", func(c *gin.Context) {

		file, err := c.FormFile("file")
		if err != nil {
			log.Panic(err)
		}

		// Upload to disk
		err = c.SaveUploadedFile(file, "./media/avatars/"+file.Filename)

		if err != nil {
			c.JSON(400, gin.H{
				"message": "Fail. body is empty",
			})
		}

		c.JSON(200, gin.H{
			"message": file.Filename + "uploaded!",
		})

		// c.String(http.StatusOK, fmt.Sprintf("'%s' uploaded!", file.Filename))
	})

	r.POST("/", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": c.ClientIP(),
		})
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
