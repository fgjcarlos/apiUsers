package post

import (
	u "apiBack/db/models"
	"testing"
	"time"
)

func TestCreate(t *testing.T) {

	user := u.User{
		Name:      "Juan",
		Email:     "fgjdf@micorrep.com",
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}

	err := AddUser(user)

	if err != nil {
		t.Error("Persistence test failed")
		t.Fail()
	} else {
		t.Log("The test finished successfully")
	}
}
