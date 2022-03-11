package utils

import "os"

// *create directory if not exists
func CreateDirIfNotExist(dir string) {
	if _, err := os.Stat(dir); os.IsNotExist(err) {
		err = os.Mkdir(dir, 0755)
		if err != nil {
			// Aquí puedes manejar mejor el error, es un ejemplo
			panic(err)
		}
	}
}
