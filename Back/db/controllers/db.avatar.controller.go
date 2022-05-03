package db

import (
	"apiBack/db"
	a "apiBack/db/models"
	"context"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

var collectionAvatars = db.GetCollection("avatars")
var ctxAvatars = context.Background()

func CreateAvatar(avatar a.Avatar) error {

	var err error

	_, err = collectionAvatars.InsertOne(ctxAvatars, avatar)

	if err != nil {
		return err
	}

	return nil
}

func ReadAvatar(filter primitive.M) (a.Avatar, error) {

	var avatar a.Avatar

	err := collectionAvatars.FindOne(ctxAvatars, filter).Decode(&avatar)

	if err != nil {
		return avatar, err
	}

	return avatar, err

}

func ReadAvatars(filter primitive.M) (a.Avatars, error) {

	var avatars a.Avatars

	cur, err := collectionAvatars.Find(ctxAvatars, filter)

	if err != nil {
		return nil, err
	}

	for cur.Next(ctxAvatars) {
		var avatar a.Avatar
		err = cur.Decode(&avatar)

		if err != nil {
			break
			// return nil, err
		}

		avatars = append(avatars, &avatar)

	}

	return avatars, nil
}

func UpdateAvatar(filter primitive.M, update primitive.M) error {

	var err error

	_, err = collectionAvatars.UpdateOne(ctxAvatars, filter, update)

	if err != nil {
		return err
	}

	return nil
}

func DeleteAvatar(filter primitive.M) error {

	var err error

	_, err = collectionAvatars.DeleteOne(ctxAvatars, filter)

	if err != nil {
		return err
	}

	return nil
}

// Get amount of Characters and sum 1 for ID
func GenerateAavatarsID() (int, error) {

	filter := bson.M{}

	amountAvatars, err := collectionAvatars.CountDocuments(ctxAvatars, filter)

	if err != nil {
		return 0, err
	}

	return int(amountAvatars) + 1, nil
}
