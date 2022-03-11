package utils

import (
	"apiBack/db/models"
	"apiBack/services/post"
	"time"
)

func UploadAvatar(fileName string, urlDir string, style map[string]string) error {

	// # Create new avatar
	newAvatar := models.Avatar{
		Name:      fileName,
		Url:       urlDir,
		Style:     style,
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}

	// # Save to db
	err := post.AddAvatar(newAvatar)

	return err

}
