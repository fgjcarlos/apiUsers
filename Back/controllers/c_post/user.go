package c_post

import (
	"apiBack/db/models"
	"apiBack/services/post"
	"apiBack/validators"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	gonanoid "github.com/matoous/go-nanoid/v2"
	"golang.org/x/crypto/bcrypt"
	"gopkg.in/go-playground/validator.v9"
)

func RegisterUser(c *gin.Context) {

	var newUser models.User
	var userValidator validators.ModelValidateUser
	validator := validator.New()

	// # Get data
	err := c.BindJSON(&newUser)

	if err != nil {

		c.JSON(400, gin.H{
			"message": "No correct data",
		})
		return
	}

	userValidator = validators.ModelValidateUser{
		Name:     newUser.Name,
		Password: newUser.Password,
	}

	// # Validate data
	err = validator.Struct(userValidator)

	if err != nil {
		c.JSON(400, gin.H{
			"message": "Error in validation data" + err.Error(),
		})
		return
	}

	// # Hashing the password with the default cost of 10
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(newUser.Password), bcrypt.DefaultCost)

	// Comparing the password with the hash
	//err = bcrypt.CompareHashAndPassword(hashedPassword, []byte(newUser.Password))
	//fmt.Println(err) // nil means it is a match

	// # Generate key for user api
	key, err := gonanoid.New(15)

	if err != nil {
		c.JSON(500, gin.H{"message": "Fail internal"})
		return
	}

	// # Assing data to newUser
	newUser.Name = strings.ToLower(newUser.Name)
	newUser.Password = string(hashedPassword)
	newUser.Key = key
	newUser.QuantityCharacters = 0
	newUser.CreatedAt = time.Now()
	newUser.UpdatedAt = time.Now()

	// # Add user
	err = post.AddUser(newUser)

	if err != nil {
		c.JSON(500, gin.H{"message": "Fail to add user", "error": err.Error()})
		return
	}

	c.JSON(200, gin.H{"message": "User added"})

}
