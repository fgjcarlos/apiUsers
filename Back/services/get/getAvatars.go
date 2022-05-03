package get

import (
	dbController "apiBack/db/controllers"
	a "apiBack/db/models"

	"go.mongodb.org/mongo-driver/bson"
)

func GetAvatars() (a.Avatars, error) {

	filter := bson.M{}

	avatars, err := dbController.ReadAvatars(filter)

	if err != nil {
		return avatars, err
	}

	return avatars, nil

}

func GetAvatarById(avatarID int) (a.Avatar, error) {

	filter := bson.M{"_id": avatarID}

	avatar, err := dbController.ReadAvatar(filter)

	if err != nil {
		return avatar, err
	}

	return avatar, nil

}
