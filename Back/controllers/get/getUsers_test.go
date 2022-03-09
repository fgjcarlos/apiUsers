package get

import (
	"testing"
)

func TestGetUsers(t *testing.T) {

	users, err := GetUsers()

	if err != nil {
		t.Error("Get users test failed")
		t.Fail()
	} else {
		t.Log("The test finished successfully")
		t.Log("Users:", users)
	}

}
