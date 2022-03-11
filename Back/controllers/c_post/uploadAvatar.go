package c_post

import (
	"apiBack/utils"
	"fmt"
	"log"

	"github.com/gin-gonic/gin"
)

func UploadAvatar(c *gin.Context) {

	// # Get data
	file, err := c.FormFile("file")
	var dir = c.PostForm("dir")
	var style = c.PostFormMap("style")
	// var typeFile = c.PostForm("type")

	if (err) != nil {
		log.Panic(err)
		c.JSON(400, gin.H{
			"message": "Fail. body is empty",
		})
		return
	}

	// ## Set new file name

	if file.Filename == "" {
		file.Filename = "file"
	}

	newFileName, errID := utils.NewFileName(file.Filename)

	if errID != nil {
		log.Panic(errID)
	}

	// ###  Set url to save in local and access by remote url
	urlDir := fmt.Sprintf("/%s/%s", dir, newFileName)
	urlDirSave := fmt.Sprintf("./media/%s", urlDir)

	// #### Upload to disk
	errSave := c.SaveUploadedFile(file, urlDirSave)

	if errSave != nil {
		log.Panic(errSave)
	}

	errDb := utils.UploadAvatar(newFileName, urlDir, style)

	if errDb != nil {
		log.Panic(errDb)
		c.JSON(500, gin.H{
			"message": "Fail to save in db",
		})
		return
	}

	var message = fmt.Sprintf("%s uploaded!", newFileName)

	c.JSON(200, gin.H{
		"message": message,
		"urlDir":  urlDir,
	})

}
