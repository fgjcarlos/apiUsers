package c_post

import (
	db "apiBack/db/controllers"
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

	fmt.Println("paso 1")
	fmt.Println("typeFile: ", typeFile)

	if len(files) <= 0 {
		c.JSON(400, gin.H{
			"message": "No files",
		})
		return
	}

	dirToCheck := fmt.Sprintf("./media/%s", dir)

	// ## Create a directory if not exist
	utils.CreateDirIfNotExist(dirToCheck)

	fmt.Println("paso 2")

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

			// Save in DB
			avatarID, err := db.GenerateAavatarsID()

			if err != nil {
				c.JSON(500, gin.H{
					"message": "Fail to generate avatar id",
				})
				return
			}
			// # Create new avatar
			newAvatar := models.Avatar{
				ID:        avatarID,
				Name:      newFileName,
				Url:       urlDir,
				CreatedAt: time.Now(),
				UpdatedAt: time.Now(),
			}

			// # Save to db
			errDb = post.AddAvatar(newAvatar)
		case "profilePhoto":

			newPrifilePhoto := models.ProfilePhoto{
				Name:      newFileName,
				Url:       urlDir,
				CreatedAt: time.Now(),
				UpdatedAt: time.Now(),
			}

			fmt.Println("in profilePhoto")

			errDb = post.AddProfilePhoto(newPrifilePhoto)

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
