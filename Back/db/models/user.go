package models

import "time"

type User struct {
	ID                 int       `bson:"_id" json:"id"`
	Name               string    `json:"name"`
	Password           string    `json:"password"`
	QuantityCharacters int       `json:"quantityCharacters"`
	CreatedAt          time.Time `bson:"created_At" json:"created_at"`
	UpdatedAt          time.Time `bson:"updated_at" json:"updated_at,omitempty"`
}
