package utils

import (
	"os"
)

// *create directory if not exists
func CreateDirIfNotExist(dir string) {
	if _, err := os.Stat(dir); os.IsNotExist(err) {
		err = os.Mkdir(dir, 0755)
		if err != nil {
			panic(err)
		}
	}
}

// Delete file if exist
func DeleteFile(path string) {

	// If not exist this file, exit
	if _, err := os.Stat(path); os.IsNotExist(err) {
		return
	}

	// Delete file
	errDelete := os.Remove(path)

	if errDelete != nil {
		return
	}

}
