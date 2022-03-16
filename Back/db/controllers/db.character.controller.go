package db

import (
	"apiBack/db"
	u "apiBack/db/models"
	"context"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

var collection = db.GetCollection("characters")
var ctx = context.Background()

func Create(Character u.Character) error {

	var err error

	_, err = collection.InsertOne(ctx, Character)

	if err != nil {
		return err
	}

	return nil
}

func ReadCharacterById(CharacterId int) (u.Character, error) {

	var Character u.Character

	// oid, _ := primitive.ObjectIDFromHex(CharacterId)

	filter := bson.M{"_id": CharacterId}

	err := collection.FindOne(ctx, filter).Decode(&Character)

	if err != nil {
		return Character, err
	}

	return Character, err
}

func ReadCharacters() (u.Characters, error) {

	var Characters u.Characters

	filter := bson.D{}

	cur, err := collection.Find(ctx, filter)

	if err != nil {
		return nil, err
	}

	for cur.Next(ctx) {
		var Character u.Character
		err = cur.Decode(&Character)

		if err != nil {
			return nil, err
		}

		Characters = append(Characters, &Character)

	}

	return Characters, nil
}

func UpdateCharacter(Character u.Character, CharacterID string) error {
	var err error

	oid, _ := primitive.ObjectIDFromHex(CharacterID)

	filter := bson.M{"_id": oid}

	update := bson.M{
		"$set": bson.M{
			"name":       Character.Name,
			"profession": Character.Profession,
			"updated_at": time.Now(),
		},
	}

	_, err = collection.UpdateOne(ctx, filter, update)

	if err != nil {
		return err
	}

	return nil
}

func DeleteCharacter(CharacterID string) error {

	var err error

	oid, _ := primitive.ObjectIDFromHex(CharacterID)

	if err != nil {
		return err
	}

	filter := bson.M{"_id": oid}

	_, err = collection.DeleteOne(ctx, filter)

	if err != nil {
		return err
	}

	return nil
}

// Get amount of Characters and sum 1 for ID
func GenerateCharacterID() (int, error) {

	filter := bson.M{}

	amountCharacters, err := collection.CountDocuments(ctx, filter)

	if err != nil {
		return 0, err
	}

	return int(amountCharacters) + 1, nil
}
