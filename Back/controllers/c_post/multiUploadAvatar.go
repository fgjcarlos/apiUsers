package c_post

import (
	"apiBack/utils"
	"fmt"
	"log"

	"github.com/gin-gonic/gin"
)

func MultiUploadAvatar(c *gin.Context) {

	// # Get data
	var dir = c.PostForm("dir")
	var style = c.PostFormMap("style")
	form, _ := c.MultipartForm()
	files := form.File["files[]"]

	var newFileName string
	var urlDir string

	for _, file := range files {
		log.Println(file.Filename)

		// ## Set new file name

		if file.Filename == "" {
			file.Filename = "file"
		}

		newFileName, errID := utils.NewFileName(file.Filename)

		if errID != nil {
			// log.Panic(errID)
			c.JSON(500, gin.H{
				"message": "Fail to save in db",
			})
			return
		}

		// ###  Set url to save in local and access by remote url
		urlDir := fmt.Sprintf("/%s/%s", dir, newFileName)
		urlDirSave := fmt.Sprintf("./media/%s", urlDir)

		// #### Upload to disk
		errSave := c.SaveUploadedFile(file, urlDirSave)

		if errSave != nil {
			// log.Panic(errSave)
			c.JSON(500, gin.H{
				"message": "Fail to save in db",
			})
			return
		}

		// ## Save in db
		errDb := utils.UploadAvatar(newFileName, urlDir, style)

		if errDb != nil {
			// log.Panic(errDb)
			c.JSON(500, gin.H{
				"message": "Fail to save in db",
			})
			return
		}

	}

	var message = fmt.Sprintf("%s uploaded!", newFileName)

	c.JSON(200, gin.H{
		"message": message,
		"urlDir":  urlDir,
	})

}
