package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Avatar struct {
	ID        primitive.ObjectID `bson:"_id,omitempty" json:"id,omitempty"`
	Name      string             `json:"name"`
	Url       string             `json:"url"`
	Style     StyleAvatar        `bson:"style" json:"style,omitempty"`
	CreatedAt time.Time          `bson:"created_At" json:"created_at"`
	UpdatedAt time.Time          `bson:"updated_at" json:"updated_at,omitempty"`
}

type Avatars []*Avatar

type StyleAvatar struct {
	Background string `json:"backgroundColor"`
}
