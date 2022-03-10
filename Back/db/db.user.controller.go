package db

import (
	u "apiBack/db/models"
	"context"
	"time"

	"go.mongodb.org/mongo-driver/bson"
)

var collection = GetCollection("users")
var ctx = context.Background()

func Create(user u.User) error {

	var err error

	_, err = collection.InsertOne(ctx, user)

	if err != nil {
		return err
	}

	return nil
}

func ReadUserById(userId int) (u.User, error) {

	var user u.User

	// oid, _ := primitive.ObjectIDFromHex(userId)

	filter := bson.M{"_id": userId}

	err := collection.FindOne(ctx, filter).Decode(&user)

	if err != nil {
		return user, err
	}

	return user, err
}

func ReadUsers() (u.Users, error) {

	var users u.Users

	filter := bson.D{}

	cur, err := collection.Find(ctx, filter)

	if err != nil {
		return nil, err
	}

	for cur.Next(ctx) {
		var user u.User
		err = cur.Decode(&user)

		if err != nil {
			return nil, err
		}

		users = append(users, &user)

	}

	return users, nil
}

func UpdateUser(user u.User, userID int) error {
	var err error

	// oid, _ := primitive.ObjectIDFromHex(userID)

	filter := bson.M{"_id": userID}

	update := bson.M{
		"$set": bson.M{
			"name":       user.Name,
			"email":      user.Email,
			"updated_at": time.Now(),
		},
	}

	_, err = collection.UpdateOne(ctx, filter, update)

	if err != nil {
		return err
	}

	return nil
}

func DeleteUser(userID int) error {

	var err error

	// oid, _ := primitive.ObjectIDFromHex(userID)

	if err != nil {
		return err
	}

	filter := bson.M{"_id": userID}

	_, err = collection.DeleteOne(ctx, filter)

	if err != nil {
		return err
	}

	return nil
}

// Get amount of users and sum 1 for ID
func GenerateUserID() (int, error) {

	filter := bson.M{}

	amountUsers, err := collection.CountDocuments(ctx, filter)

	if err != nil {
		return 0, err
	}

	return int(amountUsers) + 1, nil
}
