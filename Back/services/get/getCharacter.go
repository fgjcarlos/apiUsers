package get

import (
	dbController "apiBack/db/controllers"
	"apiBack/db/models"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func GetCharactersByUserID(userID string) (models.Characters, error) {

	var characters models.Characters
	var err error

	oid, _ := primitive.ObjectIDFromHex(userID)

	filter := bson.M{"created_by.id": oid}

	characters, err = dbController.ReadCharacters(filter)

	if err != nil {
		return nil, err
	}

	return characters, nil

}

func GetCharacters() (models.Characters, error) {

	filter := bson.M{}

	characters, err := dbController.ReadCharacters(filter)

	if err != nil {
		return characters, err
	}

	return characters, nil

}

func GetCharacterById(CharacterID int) (models.Character, error) {

	filter := bson.M{"_id": CharacterID}

	Character, err := dbController.ReadCharacter(filter)

	if err != nil {
		return Character, err
	}

	return Character, nil
}
