package db

import (
	"context"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

type Database struct {
	Mongo *mongo.Client
}

var (
	DB         *Database
	uriMongodb string
)

//initialization
func Init() {

	errDotenv := godotenv.Load(".env")

	if errDotenv != nil {
		log.Fatal("Error loading .env file db")
	}

	var MONGO_HOST = os.Getenv("MONGO_HOST")
	var MONGODB_PORT = os.Getenv("MONGODB_PORT")

	uriMongodb = fmt.Sprintf("mongodb://%s:%s", MONGO_HOST, MONGODB_PORT)

	DB = &Database{
		Mongo: SetConnect(),
	}
}

//Connection settings
func SetConnect() *mongo.Client {

	// uri := "mongodb+srv://username:password@官给的.mongodb.net"
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	client, err := mongo.Connect(ctx, options.Client().ApplyURI(uriMongodb).SetMaxPoolSize(20)) //connection pool
	if err != nil {
		fmt.Println(err)
	}
	return client
}

func Ping() error {

	client := DB.Mongo

	if err := client.Ping(context.Background(), readpref.Primary()); err != nil {
		return err
	}
	fmt.Println("connected successfully")
	return nil
}

func GetCollection(collection string) *mongo.Collection {

	errDotenv := godotenv.Load(".env")

	if errDotenv != nil {
		log.Fatal("Error loading .env file db")
	}

	var MONGO_DATABASE = os.Getenv("MONGO_DATABASE")

	client := DB.Mongo

	return (client.Database(MONGO_DATABASE).Collection(collection))

}
