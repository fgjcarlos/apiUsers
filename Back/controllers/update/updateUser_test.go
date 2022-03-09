package update

import (
	u "apiBack/db/models"
	"testing"
	"time"
)

func TestUpdateUser(t *testing.T) {

	user := u.User{
		Name:      "Manolo",
		Email:     "nolo@micorrep.com",
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}

	var userID = "622775ff5f71af52cc391d93"

	err := UpdateUser(user, userID)

	if err != nil {
		t.Error("Update user test failed")
		t.Fail()
	} else {
		t.Log("The test finished successfully")
	}

}
