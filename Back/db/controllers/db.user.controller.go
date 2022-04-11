package db

import (
	"apiBack/db"
	"apiBack/db/models"
	"context"
	"fmt"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var userCollection = db.GetCollection("users")
var userCtx = context.Background()

// Unique field
// userCollections.createIndex({name:1},{unique: true})

func CreateUser(user models.User) error {

	userOut, err := userCollection.InsertOne(userCtx, user)

	fmt.Println(userOut, err)

	if err != nil {
		return err
	}

	return nil

}

func ReadUser(userIn models.User) (models.User, error) {

	var userOut models.User

	filter := bson.M{"name": userIn.Name}

	err := userCollection.FindOne(userCtx, filter).Decode(&userOut)

	if err != nil {
		return userOut, err
	}

	return userOut, err

}

func UpdateUser(user models.User, userID string) error {

	oid, _ := primitive.ObjectIDFromHex(userID)

	filter := bson.M{"_id": oid}

	update := bson.M{"$set": bson.M{
		"name":       user.Name,
		"password":   user.Password,
		"key":        user.Key,
		"quantity":   user.QuantityCharacters,
		"updated_at": time.Now(),
	}}

	_, err := userCollection.UpdateOne(userCtx, filter, update)

	if err != nil {
		return err
	}

	return nil

}

func DeleteUser(userID string) error {

	oid, err := primitive.ObjectIDFromHex(userID)

	if err != nil {
		return err
	}

	filter := bson.M{"_id": oid}

	_, err = userCollection.DeleteOne(userCtx, filter)

	if err != nil {
		return err
	}

	return nil

}

func ReadNamesUsers() ([]models.UserName, error) {

	var names []models.UserName
	var name models.UserName

	filter := bson.D{}

	namesUser, err := userCollection.Find(userCtx, filter, options.Find().SetProjection(bson.M{"name": 1, "_id": 0}))

	if err != nil {
		return names, err
	}

	for namesUser.Next(userCtx) {

		err = namesUser.Decode(&name)

		if err != nil {
			return names, err
		}

		names = append(names, name)
	}

	return names, nil
}
