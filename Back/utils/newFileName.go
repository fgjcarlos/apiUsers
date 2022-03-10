package utils

import (
	"fmt"

	gonanoid "github.com/matoous/go-nanoid/v2"
)

func NewFileName(fileName string) (string, error) {

	id, errID := gonanoid.New(10)

	newFileName := fmt.Sprintf("%s-%s", id, fileName)

	if errID != nil {
		return "", errID
	}

	return newFileName, nil
}
