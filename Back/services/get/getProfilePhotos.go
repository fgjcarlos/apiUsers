package get

import (
	dbController "apiBack/db/controllers"
	"apiBack/db/models"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func GetProfilePhotos() (models.ProfilePhotos, error) {

	filter := bson.M{}

	profilePhotos, err := dbController.ReadProfilePhotos(filter)

	if err != nil {
		return profilePhotos, err
	}

	return profilePhotos, nil

}

func GetProfilePhoto(profilePhotoId primitive.ObjectID) (models.ProfilePhoto, error) {

	filter := bson.M{"_id": profilePhotoId}

	profilePhoto, err := dbController.ReadProfilePhoto(filter)

	if err != nil {
		return profilePhoto, err
	}

	return profilePhoto, nil

}
