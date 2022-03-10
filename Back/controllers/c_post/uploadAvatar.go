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
	var typeFile = c.PostForm("type")

	if (err) != nil {
		log.Panic(err)
		c.JSON(400, gin.H{
			"message": "Fail. body is empty",
		})
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
		log.Panic(err)
	}

	var errDb error

	if typeFile == "avatar" {
		errDb = utils.UploadAvatar(newFileName, urlDir)
	}

	if errDb != nil {
		log.Panic(errDb)
		c.JSON(500, gin.H{
			"message": "Fail to save in db",
		})
	}

	var message = fmt.Sprintf("%s uploaded!", newFileName)

	c.JSON(200, gin.H{
		"message": message,
		"urlDir":  urlDir,
	})

}