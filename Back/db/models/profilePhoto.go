package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type ProfilePhoto struct {
	ID        primitive.ObjectID `bson:"_id,omitempty" json:"id,omitempty"`
	Name      string             `json:"name"`
	Url       string             `json:"url"`
	CreatedAt time.Time          `bson:"created_At" json:"created_at"`
	UpdatedAt time.Time          `bson:"updated_at" json:"updated_at,omitempty"`
}

type ProfilePhotos []*ProfilePhoto
