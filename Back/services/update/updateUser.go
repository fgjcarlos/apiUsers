package update

import (
	dbController "apiBack/db/controllers"
	"apiBack/db/models"
	"fmt"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func UpdateUser(user models.User) error {

	filter := bson.M{"_id": user.ID}

	userUpdate := bson.M{
		"$set": bson.M{
			"name":               user.Name,
			"profilePhoto":       user.ProfilePhoto,
			"rol":                user.Rol,
			"bio":                user.Bio,
			"key":                user.Key,
			"quantityCharacters": user.QuantityCharacters,
			"updated_at":         time.Now(),
		},
	}

	err := dbController.UpdateUser(filter, userUpdate)

	if err != nil {
		fmt.Println("Fail to update user")
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
