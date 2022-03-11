package test

import (
	a "apiBack/db/models"
	"apiBack/services/delete"
	"apiBack/services/get"
	"apiBack/services/post"
	"apiBack/services/update"
	"testing"
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

var avatarID string

func TestCreateAvatar(t *testing.T) {

	oid := primitive.NewObjectID()
	avatarID = oid.Hex()

	capitals := map[string]string{ //Shorthand composite literal
		"backgroundColor": "#fff"}

	avatar := a.Avatar{
		ID:        oid,
		Name:      "FirstAvatar",
		Style:     capitals,
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}

	err := post.AddAvatar(avatar)

	if err != nil {
		t.Error("Add avatar test failed")
		t.Fail()
	} else {
		t.Log("The test finished successfully")
	}

}

func TestGetAvatarById(t *testing.T) {
	avatar, err := get.GetAvatarById(avatarID)

	if err != nil {
		t.Error("Get avatar by id test failed")
		t.Fail()
	} else {
		t.Log("The avatar recived id:", avatar)
	}

}

func TestGetAvatars(t *testing.T) {

	avatars, err := get.GetAvatars()

	if err != nil {
		t.Error("Get avatars buy id test failed")
		t.Fail()
	} else {
		t.Log("The avatars recived id:", avatars)
	}
}

func TestUpdateAvatar(t *testing.T) {

	avatar := a.Avatar{
		Name:      "Manolo",
		Url:       "www.marca.com",
		Style:     map[string]string{"backgroundColor": "#000"},
		UpdatedAt: time.Now(),
	}

	err := update.UpdateAvatar(avatar, avatarID)

	if err != nil {
		t.Error("Update avatar test failed")
		t.Fail()
	} else {
		t.Log("The test finished successfully")
	}

}

func TestDeleteAvatar(t *testing.T) {

	err := delete.DeleteAvatar(avatarID)

	if err != nil {
		t.Error("Delete Character test failed")
		t.Fail()
	} else {
		t.Log("The test finished successfully")
	}

}
