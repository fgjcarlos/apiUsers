package db

import (
	u "apiBack/utils"
	"context"
	"fmt"
	"log"
	"os"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func GetCollection(collection string) *mongo.Collection {

	//load env
	u.LoadEnv()

	var MONGO_HOST = os.Getenv("MONGO_HOST")
	var MONGODB_PORT = os.Getenv("MONGODB_PORT")
	var MONGO_DATABASE = os.Getenv("MONGO_DATABASE")

	var uriMongodb = fmt.Sprintf("mongodb://%s:%s", MONGO_HOST, MONGODB_PORT)

	client, err := mongo.NewClient(options.Client().ApplyURI(uriMongodb))

	if err != nil {
		panic(err.Error())
	}

	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	err = client.Connect(ctx)

	if err != nil {
		panic(err.Error())
	}

	log.Println("Conexion with database successed")

	return (client.Database(MONGO_DATABASE).Collection(collection))

}
