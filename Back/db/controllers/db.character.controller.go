package db

import (
	"apiBack/db"
	"apiBack/db/models"
	u "apiBack/db/models"
	"context"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var collectionCharacters = db.GetCollection("characters")
var ctxCharacter = context.Background()

func Create(Character models.Character) error {

	_, err := collectionCharacters.InsertOne(ctxCharacter, Character)

	if err != nil {
		return err
	}

	return nil
}

func ReadCharacter(filter primitive.M) (models.Character, error) {

	var Character u.Character

	err := collectionCharacters.FindOne(ctxCharacter, filter).Decode(&Character)

	return Character, err
}

func ReadCharacters(filter primitive.M) (models.Characters, error) {

	var Characters u.Characters

	cur, err := collectionCharacters.Find(ctxCharacter, filter)

	if err != nil {
		return nil, err
	}

	for cur.Next(ctxCharacter) {

		var Character u.Character
		err = cur.Decode(&Character)

		if err != nil {

			// TODO -> continue or break? see, change props of characters...
			// continue
			// return nil, err
		}

		Characters = append(Characters, &Character)

	}

	return Characters, nil
}

func UpdateCharacter(filter primitive.M, update primitive.M) error {
	var err error

	_, err = collectionCharacters.UpdateOne(ctxCharacter, filter, update)

	if err != nil {
		return err
	}

	return nil
}

func DeleteCharacter(filter primitive.M) error {

	_, err := collectionCharacters.DeleteOne(ctxCharacter, filter)

	if err != nil {
		return err
	}

	return nil
}

// Get amount of Characters and sum 1 for ID
func GenerateID() (int, error) {

	var Characters models.Characters

	filter := bson.D{}

	options := options.Find().SetSort(bson.D{{"_id", -1}}).SetLimit(1)

	// amountCharacters, err := collectionCharacters.CountDocuments(ctxCharacter, filter)
	cur, err := collectionCharacters.Find(ctxCharacter, filter, options)

	if err != nil {
		return 0, err
	}

	for cur.Next(ctxCharacter) {

		var Character u.Character
		_ = cur.Decode(&Character)

		if err != nil {
			return 0, err
		}

		Characters = append(Characters, &Character)
	}

	lastCharacterID := Characters[0].ID

	return int(lastCharacterID + 2), nil
}
