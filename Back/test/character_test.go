package test

import (
	"apiBack/services/delete"
	"apiBack/services/get"
	"strconv"

	"testing"
)

var CharacterID string

// func TestCreateCharacter(t *testing.T) {

// 	oid := primitive.NewObjectID()
// 	CharacterID = oid.Hex()

//func TestCreateCharacter(t *testing.T) {

// 	oid := primitive.NewObjectID()
// 	CharacterID = oid.Hex()

// 	CharacterID_int, err := strconv.Atoi(CharacterID)
// 	var listInterests []string

// 	listInterests = append(listInterests, "Sports")
// 	listInterests = append(listInterests, "Reading")

// 	avatar := u.Avatar{
// 		ID:   CharacterID_int,
// 		Name: "Avatar",
// 		Url:  "/avatars/Sk8qSjpl5V-imgPost1.webp",
// 	}

// 	Character := u.Character{
// 		ID:         CharacterID_int,
// 		Name:       "Juan da",
// 		Avatar:     avatar,
// 		Birthday:   time.Now(),
// 		Profession: "Doctor",
// 		Biography:  "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet.",
// 		Interests:  listInterests,
// 		Gender:     "male",
// 		Created_by: "admin",
// 		CreatedAt:  time.Now(),
// 		UpdatedAt:  time.Now(),
// 	}

// 	fmt.Printf("## New Character %v", Character)

// 	err = post.AddCharacter(Character)

// 	if err != nil {
// 		t.Error("Add Character test failed")
// 		t.Fail()
// 	} else {
// 		t.Log("The test finished successfully")
// 	}
// } 	CharacterID_int, err := strconv.Atoi(CharacterID)
// 	var listInterests []string

// 	listInterests = append(listInterests, "Sports")
// 	listInterests = append(listInterests, "Reading")

// 	avatar := u.Avatar{
// 		ID:   CharacterID_int,
// 		Name: "Avatar",
// 		Url:  "/avatars/Sk8qSjpl5V-imgPost1.webp",
// 	}

// 	Character := u.Character{
// 		ID:         CharacterID_int,
// 		Name:       "Juan da",
// 		Avatar:     avatar,
// 		Birthday:   time.Now(),
// 		Profession: "Doctor",
// 		Biography:  "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet.",
// 		Interests:  listInterests,
// 		Gender:     "male",
// 		Created_by: "admin",
// 		CreatedAt:  time.Now(),
// 		UpdatedAt:  time.Now(),
// 	}

// 	fmt.Printf("## New Character %v", Character)

// 	err = post.AddCharacter(Character)

// 	if err != nil {
// 		t.Error("Add Character test failed")
// 		t.Fail()
// 	} else {
// 		t.Log("The test finished successfully")
// 	}
// }

func TestGetCharacterById(t *testing.T) {

	CharacterID_int, err := strconv.Atoi(CharacterID)

	Character, err := get.GetCharacterById(CharacterID_int)

	if err != nil {
		t.Error("Get Character buy id test failed")
		t.Fail()
	} else {
		t.Log("The Character recived id:", Character)
	}

}

// func TestUpdateCharacter(t *testing.T) {

// 	Character := u.Character{
// 		Name:      "Manolo",
// 		UpdatedAt: time.Now(),
// 	}

// 	err := update.UpdateCharacter(Character, CharacterID)

// 	if err != nil {
// 		t.Error("Update Character test failed")
// 		t.Fail()
// 	} else {
// 		t.Log("The test finished successfully")
// 	}

// }

func TestDeleteCharacter(t *testing.T) {

	err := delete.DeleteCharacterById(CharacterID)

	if err != nil {
		t.Error("Delete Character test failed")
		t.Fail()
	} else {
		t.Log("The test finished successfully")
	}

}
