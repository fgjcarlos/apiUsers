package db

import (
	"apiBack/db"
	"apiBack/db/models"
	"context"

	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

// var collectionProfilePhoto = db.GetCollection("profilePhoto")
// var ctxProfilePhoto = context.Background()

var (
	// collectionProfilePhoto *mongo.Collection
	ctxProfilePhoto context.Context
)

func init() {
	// collectionProfilePhoto = db.GetCollection("profilePhoto")
	ctxProfilePhoto = context.TODO()
}

func GetCollectionProfilePhoto() *mongo.Collection {
	return db.GetCollection("profilePhoto")
}

func CreateProfilePhoto(profilePhoto models.ProfilePhoto) error {

	var err error
	var collectionProfilePhoto = GetCollectionProfilePhoto()

	_, err = collectionProfilePhoto.InsertOne(ctxProfilePhoto, profilePhoto)

	if err != nil {
		return err
	}

	return nil
}

func ReadProfilePhoto(filter primitive.M) (models.ProfilePhoto, error) {

	var profilePhoto models.ProfilePhoto
	var collectionProfilePhoto = GetCollectionProfilePhoto()

	err := collectionProfilePhoto.FindOne(ctxProfilePhoto, filter).Decode(&profilePhoto)

	if err != nil {
		return profilePhoto, err
	}

	return profilePhoto, err

}

func ReadProfilePhotos(filter primitive.M) (models.ProfilePhotos, error) {

	var profilePhotos models.ProfilePhotos
	var collectionProfilePhoto = GetCollectionProfilePhoto()

	cur, err := collectionProfilePhoto.Find(ctxProfilePhoto, filter)

	if err != nil {
		return nil, err
	}

	for cur.Next(ctxProfilePhoto) {
		var profilePhoto models.ProfilePhoto
		err = cur.Decode(&profilePhoto)

		if err != nil {
			break
			// return nil, err
		}

		profilePhotos = append(profilePhotos, &profilePhoto)
	}

	return profilePhotos, err

}
