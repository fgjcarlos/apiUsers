package test

import (
	"apiBack/services/delete"
	"apiBack/services/get"
	"apiBack/services/post"
	"apiBack/services/update"
	"fmt"

	u "apiBack/db/models"
	"testing"
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

var CharacterID string

func TestCreateCharacter(t *testing.T) {

	oid := primitive.NewObjectID()
	CharacterID = oid.Hex()

	var listInterests []string

	listInterests = append(listInterests, "Sports")
	listInterests = append(listInterests, "Reading")

	Character := u.Character{
		ID:         oid,
		Name:       "Juan da",
		Avatar:     "/avatars/Sk8qSjpl5V-imgPost1.webp",
		Birthday:   time.Now(),
		Profession: "Doctor",
		Biography:  "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet.",
		Interests:  listInterests,
		Gender:     "male",
		Created_by: "admin",
		CreatedAt:  time.Now(),
		UpdatedAt:  time.Now(),
	}

	fmt.Printf("## New Character %s", Character)

	err := post.AddCharacter(Character)

	if err != nil {
		t.Error("Add Character test failed")
		t.Fail()
	} else {
		t.Log("The test finished successfully")
	}
}

func TestGetCharacterById(t *testing.T) {

	Character, err := get.GetCharacterById(CharacterID)

	if err != nil {
		t.Error("Get Character buy id test failed")
		t.Fail()
	} else {
		t.Log("The Character recived id:", Character)
	}

}

func TestUpdateCharacter(t *testing.T) {

	Character := u.Character{
		Name:      "Manolo",
		UpdatedAt: time.Now(),
	}

	err := update.UpdateCharacter(Character, CharacterID)

	if err != nil {
		t.Error("Update Character test failed")
		t.Fail()
	} else {
		t.Log("The test finished successfully")
	}

}

func TestDeleteCharacter(t *testing.T) {

	err := delete.DeleteCharacter(CharacterID)

	if err != nil {
		t.Error("Delete Character test failed")
		t.Fail()
	} else {
		t.Log("The test finished successfully")
	}

}
