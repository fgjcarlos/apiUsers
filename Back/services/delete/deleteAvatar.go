package delete

import (
	dbController "apiBack/db/controllers"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func DeleteAvatarByID(avatarID string) error {

	var err error

	oid, _ := primitive.ObjectIDFromHex(avatarID)

	if err != nil {
		return err
	}

	filter := bson.M{"_id": oid}

	err = dbController.DeleteAvatar(filter)

	if err != nil {
		return err
	}

	return nil
}
