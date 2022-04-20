package get

import (
	dbController "apiBack/db/controllers"
	"apiBack/db/models"

	jwt "github.com/appleboy/gin-jwt/v2"
	"github.com/gin-gonic/gin"
)

func ExtractClaims(c *gin.Context) string {

	claims := jwt.ExtractClaims(c)

	id := claims["_id"].(string)

	return id
}

func GetUser(userIn models.User) (models.User, error) {

	user, err := dbController.ReadUser(userIn)

	if err != nil {
		return user, err
	}

	return user, nil

}

func GetUserById(UserID string) (models.User, error) {

	user, err := dbController.ReadUserById(UserID)

	if err != nil {
		return user, err
	}

	return user, nil
}
