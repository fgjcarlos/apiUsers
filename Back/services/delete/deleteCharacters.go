package delete

import (
	dbController "apiBack/db/controllers"
	"strconv"

	"go.mongodb.org/mongo-driver/bson"
)

func DeleteCharacterById(CharacterID string) error {

	var err error

	oid, err := strconv.Atoi(CharacterID)

	if err != nil {
		return err
	}

	filter := bson.M{"_id": oid}

	err = dbController.DeleteCharacter(filter)

	if err != nil {
		return err
	}

	return nil
}
