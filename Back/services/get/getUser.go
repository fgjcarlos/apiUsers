package get

import (
	dbController "apiBack/db/controllers"
	"apiBack/db/models"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func GetUser(userIn models.User) (models.User, error) {

	filter := bson.M{"name": userIn.Name}

	user, err := dbController.ReadUser(filter)

	if err != nil {
		return user, err
	}

	return user, nil

}

func GetUserById(UserID string) (models.User, error) {

	oid, _ := primitive.ObjectIDFromHex(UserID)

	filter := bson.M{"_id": oid}

	user, err := dbController.ReadUser(filter)

	if err != nil {
		return user, err
	}

	return user, nil
}

func GetNamesUsers() ([]models.UserName, error) {

	filter := bson.M{}
	options := options.Find().SetProjection(bson.M{"name": 1, "_id": 0})

	users, err := dbController.ReadUsers(filter, options)

	if err != nil {
		return users, err
	}

	return users, nil

}
