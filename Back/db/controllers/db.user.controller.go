package db

import (
	"apiBack/db"
	"apiBack/db/models"
	"context"

	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var userCollection = db.GetCollection("users")
var userCtx = context.Background()

// Unique field
// userCollections.createIndex({name:1},{unique: true})

func CreateUser(user models.User) error {

	_, err := userCollection.InsertOne(userCtx, user)

	if err != nil {
		return err
	}

	return nil

}

func ReadUser(filter primitive.M) (models.User, error) {

	var userOut models.User

	err := userCollection.FindOne(userCtx, filter).Decode(&userOut)

	if err != nil {
		return userOut, err
	}

	return userOut, err

}

func UpdateUser(filter primitive.M, update primitive.M) error {

	_, err := userCollection.UpdateOne(userCtx, filter, update)

	if err != nil {
		return err
	}

	return nil

}

func FindUserAndUpdate(filter primitive.M, update primitive.M) (models.User, error) {

	var user models.User

	err := userCollection.FindOneAndUpdate(userCtx, filter, update).Decode(&user)

	if err != nil {
		return user, err
	}

	return user, nil

}

func DeleteUser(filter primitive.M) error {

	_, err := userCollection.DeleteOne(userCtx, filter)

	if err != nil {
		return err
	}

	return nil
}

func ReadUsers(filter primitive.M, options *options.FindOptions) ([]models.UserName, error) {

	var names []models.UserName
	var name models.UserName

	namesUser, err := userCollection.Find(userCtx, filter, options)

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
