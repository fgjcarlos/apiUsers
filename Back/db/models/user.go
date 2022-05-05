package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type User struct {
	ID                 primitive.ObjectID `bson:"_id,omitempty" json:"id,omitempty"`
	ProfilePhoto       ProfilePhoto       `bson:"profilePhoto,omitempty" json:"profilePhoto,omitempty"`
	Rol                string             `json:"rol"`
	Bio                string             `json:"bio"`
	Name               string             `json:"name"`
	Password           string             `json:"password"`
	Key                string             `json:"key"`
	QuantityCharacters int                `json:"quantityCharacters"`
	CreatedAt          time.Time          `bson:"created_At" json:"created_at"`
	UpdatedAt          time.Time          `bson:"updated_at" json:"updated_at,omitempty"`
}

type UserName struct {
	Name string `json:"name"`
}
