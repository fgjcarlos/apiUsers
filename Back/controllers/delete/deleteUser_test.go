package delete

import (
	"testing"
)

func TestDeleteUser(t *testing.T) {

	var userID = "622775ff5f71af52cc391d93"

	err := DeleteUser(userID)

	if err != nil {
		t.Error("Delete user test failed")
		t.Fail()
	} else {
		t.Log("The test finished successfully")
	}

}
