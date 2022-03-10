package test

import (
	"apiBack/db"
	"apiBack/db/delete"
	"apiBack/db/get"
	"apiBack/db/post"
	"apiBack/db/update"

	u "apiBack/db/models"
	"testing"
	"time"
)

var userID int

func TestCreate(t *testing.T) {

	userid, errID := db.GenerateUserID()

	userID = userid

	if errID != nil {
		t.Error("Generate ID failed")
	}

	user := u.User{
		ID:        userID,
		Name:      "Juan da",
		Email:     "fgjdf@micorrep.com",
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}

	err := post.AddUser(user)

	if err != nil {
		t.Error("Add user test failed")
		t.Fail()
	} else {
		t.Log("The test finished successfully")
	}
}

func TestGetUserById(t *testing.T) {

	user, err := get.GetUserById(userID)

	if err != nil {
		t.Error("Get user buy id test failed")
		t.Fail()
	} else {
		t.Log("The user recived id:", user)
	}

}

func TestUpdateUser(t *testing.T) {

	user := u.User{
		Name:      "Manolo",
		Email:     "nolo@micorrep.com",
		UpdatedAt: time.Now(),
	}

	err := update.UpdateUser(user, userID)

	if err != nil {
		t.Error("Update user test failed")
		t.Fail()
	} else {
		t.Log("The test finished successfully")
	}

}

func TestDeleteUser(t *testing.T) {

	err := delete.DeleteUser(userID)

	if err != nil {
		t.Error("Delete user test failed")
		t.Fail()
	} else {
		t.Log("The test finished successfully")
	}

}
