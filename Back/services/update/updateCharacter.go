package update

import (
	dbController "apiBack/db/controllers"
	u "apiBack/db/models"
	"fmt"
	"time"

	"go.mongodb.org/mongo-driver/bson"
)

func UpdateCharacter(Character u.Character) error {

	filter := bson.M{"_id": Character.ID}

	fmt.Println("Character", Character)

	update := bson.M{
		"$set": bson.M{
			"name":       Character.Name,
			"avatar":     Character.Avatar,
			"birthday":   Character.Birthday,
			"profession": Character.Profession,
			"biography":  Character.Biography,
			"interests":  Character.Interests,
			"gender":     Character.Gender,
			"created_by": Character.Created_by,
			"created_at": Character.CreatedAt,
			"updated_at": time.Now(),
		},
	}

	err := dbController.UpdateCharacter(filter, update)

	if err != nil {
		return err
	}

	return nil
}
