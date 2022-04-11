package c_post

import (
	"apiBack/db/models"
	"apiBack/services/post"

	"github.com/gin-gonic/gin"
	gonanoid "github.com/matoous/go-nanoid/v2"
	"golang.org/x/crypto/bcrypt"
)

func RegisterUser(c *gin.Context) {

	var newUser models.User

	// # Get data
	err := c.BindJSON(&newUser)

	if err != nil {
		c.JSON(400, gin.H{
			"message": "No correct data",
		})
		return
	}

	// # Hashing the password with the default cost of 10
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(newUser.Password), bcrypt.DefaultCost)

	// Comparing the password with the hash
	//err = bcrypt.CompareHashAndPassword(hashedPassword, []byte(newUser.Password))
	//fmt.Println(err) // nil means it is a match

	key, err := gonanoid.New(15)

	if err != nil {
		c.JSON(500, gin.H{"message": "Fail internal"})
		return
	}

	// # Assing data to newUser
	newUser.Password = string(hashedPassword)
	newUser.Key = key
	newUser.QuantityCharacters = 0

	// # Add user
	err = post.AddUser(newUser)

	if err != nil {
		c.JSON(500, gin.H{"message": "Fail to add user", "error": err.Error()})
		return
	}

	c.JSON(200, gin.H{"message": "User added"})

}
