package db

import (
	"apiBack/db"
	"apiBack/db/models"
	u "apiBack/db/models"
	"context"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
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

	if err != nil {
		return Character, err
	}

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
func GenerateCharacterID() (int, error) {

	filter := bson.M{}

	amountCharacters, err := collectionCharacters.CountDocuments(ctxCharacter, filter)

	if err != nil {
		return 0, err
	}

	return int(amountCharacters) + 1, nil
}
