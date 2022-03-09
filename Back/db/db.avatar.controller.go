package db

import (
	a "apiBack/db/models"
	"context"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

var collectionAvatars = GetCollection("avatars")
var ctxAvatars = context.Background()

func CreateAvatar(avatar a.Avatar) error {

	var err error

	_, err = collectionAvatars.InsertOne(ctxAvatars, avatar)

	if err != nil {
		return err
	}

	return nil
}

func ReadAvatarById(avatarID string) (a.Avatar, error) {

	var avatar a.Avatar

	oid, _ := primitive.ObjectIDFromHex(avatarID)

	filter := bson.M{"_id": oid}

	err := collectionAvatars.FindOne(ctxAvatars, filter).Decode(&avatar)

	if err != nil {
		return avatar, err
	}

	return avatar, err

}

func ReadAvatars() (a.Avatars, error) {

	var avatars a.Avatars

	filter := bson.D{}

	cur, err := collectionAvatars.Find(ctxAvatars, filter)

	if err != nil {
		return nil, err
	}

	for cur.Next(ctxAvatars) {
		var avatar a.Avatar
		err = cur.Decode(&avatar)

		if err != nil {
			return nil, err
		}

		avatars = append(avatars, &avatar)

	}

	return avatars, nil
}

func UpdateAvatar(avatar a.Avatar, userID string) error {
	var err error

	oid, _ := primitive.ObjectIDFromHex(userID)

	filter := bson.M{"_id": oid}

	update := bson.M{
		"$set": bson.M{
			"name":       avatar.Name,
			"url":        avatar.Url,
			"style":      avatar.Style,
			"updated_at": time.Now(),
		},
	}

	_, err = collectionAvatars.UpdateOne(ctxAvatars, filter, update)

	if err != nil {
		return err
	}

	return nil
}

func DeleteAvatar(avatarID string) error {

	var err error

	oid, _ := primitive.ObjectIDFromHex(avatarID)

	if err != nil {
		return err
	}

	filter := bson.M{"_id": oid}

	_, err = collectionAvatars.DeleteOne(ctxAvatars, filter)

	if err != nil {
		return err
	}

	return nil
}
