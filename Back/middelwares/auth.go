package middelwares

import (
	"apiBack/db/models"
	"apiBack/services/get"
	"apiBack/validators"
	"os"
	"time"

	jwt "github.com/appleboy/gin-jwt/v2"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"golang.org/x/crypto/bcrypt"
)

func Jwt() (*jwt.GinJWTMiddleware, error) {

	var secretKey = os.Getenv("SECRET_KEY")
	var identityKey = "_id"

	// # Create the JWT middleware
	authMiddleware, err := jwt.New(&jwt.GinJWTMiddleware{
		Realm:       "test zone",
		Key:         []byte(secretKey),
		Timeout:     time.Hour * 72,
		MaxRefresh:  time.Hour * 72,
		IdentityKey: identityKey,
		PayloadFunc: func(data interface{}) jwt.MapClaims {
			if v, ok := data.(*models.User); ok {
				return jwt.MapClaims{
					identityKey: v.ID.Hex(),
				}
			}
			return jwt.MapClaims{}
		},
		IdentityHandler: func(c *gin.Context) interface{} {
			claims := jwt.ExtractClaims(c)

			oid, _ := primitive.ObjectIDFromHex(claims[identityKey].(string))

			return &models.User{
				ID: oid,
			}
		},
		Authenticator: func(c *gin.Context) (interface{}, error) {
			var loginVals models.User
			var userDB models.User
			var errPassword error

			// # Get data
			err := c.BindJSON(&loginVals)

			if err != nil {
				return "", jwt.ErrMissingLoginValues
			}

			// # Validate data
			err = validators.ValidateUser(loginVals)

			if err != nil {
				return "", jwt.ErrMissingLoginValues
			}

			// 1.! Check if user exists
			userDB, err = get.GetUser(loginVals)

			if err != nil {
				return "", jwt.ErrMissingLoginValues
			}

			// 2.1 Comparing the password with the hash
			if (userDB == models.User{}) {
				errPassword = nil
			} else {

				errPassword = bcrypt.CompareHashAndPassword([]byte(userDB.Password), []byte(loginVals.Password))
			}

			if (errPassword == nil && userDB != models.User{}) {

				return &models.User{
					ID:   userDB.ID,
					Name: userDB.Name,
				}, nil
			}

			return nil, jwt.ErrFailedAuthentication
		},
		Authorizator: func(data interface{}, c *gin.Context) bool {

			v, ok := data.(*models.User)

			// ** If url path user, rol user and ok,  return true, also check key user

			// && (strings.Split(c.Request.URL.Path, "/")[1]) == "user"

			if ok {
				return true
			}

			if ok && v.Name == "admin" {
				return true
			}

			return false
		},
		Unauthorized: func(c *gin.Context, code int, message string) {
			c.JSON(code, gin.H{
				"code":    code,
				"message": message,
			})
		},
		// TokenLookup is a string in the form of "<source>:<name>" that is used
		// to extract token from the request.
		// Optional. Default value "header:Authorization".
		// Possible values:
		// - "header:<name>"
		// - "query:<name>"
		// - "cookie:<name>"
		// - "param:<name>"
		TokenLookup: "header: Authorization, query: token, cookie: jwt",
		// TokenLookup: "query:toniloken",

		// TokenHeadName is a string in the header. Default value is "Bearer"
		TokenHeadName: "Bearer",

		// TimeFunc provides the current time. You can override it to use another time value. This is useful for testing or if your server uses a different time zone than your tokens.
		TimeFunc: time.Now,
	})

	return authMiddleware, err
}

func ExtractClaimsID(c *gin.Context) string {

	claims := jwt.ExtractClaims(c)

	id := claims["_id"].(string)

	return id
}
