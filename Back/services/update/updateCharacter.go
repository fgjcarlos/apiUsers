package update

import (
	dbController "apiBack/db/controllers"
	u "apiBack/db/models"
	"time"

	"go.mongodb.org/mongo-driver/bson"
)

func UpdateCharacter(Character u.Character) error {

	filter := bson.M{"_id": Character.ID}

	update := bson.M{
		"$set": bson.M{
			"name":       Character.Name,
			"profession": Character.Profession,
			"updated_at": time.Now(),
		},
	}

	err := dbController.UpdateCharacter(filter, update)

	if err != nil {
		return err
	}

	return nil
}
