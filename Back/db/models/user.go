package models

import (
	"time"
)

type User struct {
	ID        int       `bson:"_id" json:"id"`
	Name      string    `json:"name"`
	Email     string    `json:"email"`
	CreatedAt time.Time `bson:"created_At" json:"created_at"`
	UpdatedAt time.Time `bson:"updated_at" json:"updated_at,omitempty"`
}

type Users []*User
