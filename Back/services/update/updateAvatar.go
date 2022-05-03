package update

import (
	dbController "apiBack/db/controllers"
	a "apiBack/db/models"
	"time"

	"go.mongodb.org/mongo-driver/bson"
)

func UpdateAvatar(avatar a.Avatar) error {

	filter := bson.M{"_id": avatar.ID}

	update := bson.M{
		"$set": bson.M{
			"name":       avatar.Name,
			"url":        avatar.Url,
			"style":      avatar.Style,
			"updated_at": time.Now(),
		},
	}

	err := dbController.UpdateAvatar(filter, update)

	if err != nil {
		return err
	}

	return nil
}
