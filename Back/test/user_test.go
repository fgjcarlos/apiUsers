package test

import (
	"apiBack/db/models"
	"apiBack/services/delete"
	"apiBack/services/get"
	"apiBack/services/post"
	"testing"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

var userID primitive.ObjectID

func TestCreateUser(t *testing.T) {

	user := models.User{
		Name:               "JositoMaria",
		Password:           "123456",
		Key:                "123456",
		QuantityCharacters: 2,
	}

	err := post.AddUser(user)

	if err != nil {
		t.Error("Add user test failed")
		t.Fail()
	} else {
		t.Log("The test finished successfully")
	}
}

func TestReadUser(t *testing.T) {

	filter := models.User{
		Name: "JositoMaria",
	}

	user, err := get.GetUser(filter)

	userID = user.ID

	if err != nil {
		t.Error("Read user test failed", err)
		t.Fail()
	} else {
		t.Log("The test finished successfully")
		t.Logf("The user recived is: %v", user)
	}

}

// func TestUpdateUser(t *testing.T) {

// 	oid := userID.Hex()

// 	user := models.User{
// 		Name:               "JositoTonio",
// 		Password:           "123456",
// 		Key:                "123456",
// 		QuantityCharacters: 2,
// 	}

// 	err := update.UpdateUser(user, oid)

// 	if err != nil {
// 		t.Error("Update user test failed")
// 		t.Fail()
// 	} else {
// 		t.Log("The test finished successfully")
// 	}

// }

func TestDeleteUser(t *testing.T) {

	oid := userID.Hex()

	err := delete.DeleteUser(oid)

	if err != nil {
		t.Error("Delete user test failed")
		t.Fail()
	} else {
		t.Log("The test finished successfully")
	}

}
