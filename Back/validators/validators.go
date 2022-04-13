package validators

type ValidateUser struct {
	Name     string `json:"name" validate:"required,min=2,max=20"`
	Password string `json:"password" validate:"required,min=6,max=24"`
}
