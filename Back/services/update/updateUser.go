package update

import (
	dbController "apiBack/db/controllers"
	"apiBack/db/models"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func UpdateUser(user models.User) error {

	filter := bson.M{"_id": user.ID}

	update := bson.M{"$set": bson.M{
		"name":               user.Name,
		"password":           user.Password,
		"key":                user.Key,
		"quantityCharacters": user.QuantityCharacters,
		"updated_at":         time.Now(),
	}}

	err := dbController.UpdateUser(filter, update)

	if err != nil {
		return err
	}

	return nil
}

func UserUpdateQuantityCharacters(userID string, quantity int) (models.User, error) {

	var user models.User
	var err error

	oid, _ := primitive.ObjectIDFromHex(userID)

	filter := bson.M{"_id": oid}

	update := bson.M{"$inc": bson.M{"quantityCharacters": quantity}}

	user, err = dbController.FindUserAndUpdate(filter, update)

	if err != nil {
		return user, err
	}

	return user, nil
}
