package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Character struct {
	ID         int        `bson:"_id,omitempty" json:"id,omitempty"`
	Name       string     `json:"name"`
	Avatar     Avatar     `json:"avatar"`
	Birthday   time.Time  `json:"birthday"`
	Profession string     `json:"profession"`
	Biography  string     `json:"biography"`
	Interests  []string   `json:"interests"`
	Gender     string     `json:"gender"`
	Created_by Created_by `json:"created_by"`
	CreatedAt  time.Time  `bson:"created_At" json:"created_at"`
	UpdatedAt  time.Time  `bson:"updated_at" json:"updated_at,omitempty"`
}

type Characters []*Character

type Created_by struct {
	ID   primitive.ObjectID `bson:"id,omitempty" json:"id,omitempty"`
	Name string             `bson:"name,omitempty" json:"name,omitempty"`
}
