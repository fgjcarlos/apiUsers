package validators

import (
	"apiBack/db/models"

	"github.com/go-playground/validator"
)

type ModelValidateUser struct {
	Name     string `json:"name" validate:"required,min=2,max=20"`
	Password string `json:"password" validate:"required,min=6,max=24"`
}

func ValidateUser(userIn models.User) error {

	validator := validator.New()

	userValidator := ModelValidateUser{
		Name:     userIn.Name,
		Password: userIn.Password,
	}

	return validator.Struct(userValidator)
}
