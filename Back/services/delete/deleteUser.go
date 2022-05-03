package delete

import (
	dbController "apiBack/db/controllers"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func DeleteUser(userID string) error {

	oid, err := primitive.ObjectIDFromHex(userID)

	if err != nil {
		return err
	}

	filter := bson.M{"_id": oid}

	err = dbController.DeleteUser(filter)

	if err != nil {
		return err
	}

	return nil

}
