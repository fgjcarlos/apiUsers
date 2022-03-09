package get

import (
	"testing"
)

func TestGetUserById(t *testing.T) {

	// var user u.User

	var userId = "62277589927640dea34a0aad"

	user, err := GetUserById(userId)

	if err != nil {
		t.Error("Get user buy id test failed")
		t.Fail()
	} else {
		t.Log("The user recived id:", user)
	}

}
