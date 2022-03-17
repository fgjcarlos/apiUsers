package c_post

import (
	"apiBack/db/models"
	"apiBack/services/post"
	"apiBack/utils"
	"fmt"
	"time"

	"github.com/gin-gonic/gin"
)

func UploadFile(c *gin.Context) {

	var newFileName string
	var urlDir string

	// # Get data
	var dir = c.PostForm("dir")
	var typeFile = c.PostForm("type")

	form, _ := c.MultipartForm()
	files := form.File["files[]"]

	if len(files) <= 0 {
		c.JSON(400, gin.H{
			"message": "No files",
		})
		return
	}

	for _, file := range files {

		// *Add a uuid
		newFileName, errID := utils.NewFileName(file.Filename)

		if errID != nil {
			// // log.Panic(errID)
			c.JSON(500, gin.H{"message": "Fail to get uuid"})
			return
		}

		// ###  Set url to save in local and access by remote url
		urlDir := fmt.Sprintf("/%s/%s", dir, newFileName)
		urlDirSave := fmt.Sprintf("./media/%s", urlDir)
		dirToCheck := fmt.Sprintf("./media/%s", dir)

		// ## Create a directory if not exist
		utils.CreateDirIfNotExist(dirToCheck)

		// #### Upload to disk
		errSave := c.SaveUploadedFile(file, urlDirSave)

		if errSave != nil {
			// log.Panic(errSave)
			c.JSON(500, gin.H{"message": "Fail to save in disk"})
			return
		}

		// ## Save in db
		var errDb error

		switch typeFile {
		case "avatar":

			// # Create new avatar
			newAvatar := models.Avatar{
				Name:      newFileName,
				Url:       urlDir,
				CreatedAt: time.Now(),
				UpdatedAt: time.Now(),
			}

			// # Save to db
			errDb = post.AddAvatar(newAvatar)

		default:
			c.JSON(500, gin.H{"message": "Not type file"})
			return
		}

		if errDb != nil {
			// Delete file created if exit error in save db
			utils.DeleteFile(urlDirSave)
			// log.Panic(errDb)
			c.JSON(500, gin.H{"message": "Fail to save in db"})
			return
		}

	}

	var message = fmt.Sprintf("%s uploaded!", newFileName)

	c.JSON(200, gin.H{
		"message": message,
		"urlDir":  urlDir,
	})

}
