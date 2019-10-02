package main

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/labstack/echo"
)

func main() {
	e := echo.New()
	e.Static("/", "public")

}

func request() {
	//GET request from open weather
	res, err := http.Get("http://api.openweathermap.org/data/2.5/weather?q=Morelos,mx&appid=fef09f9cd856af32af153efcf53391dd")
	if err != nil {
		log.Fatal(err)
	}

	weather, err := ioutil.ReadAll(res.Body)
	defer res.Body.Close()
	if err != nil {
		log.Fatal(err)
	}

	var raw map[string]interface{}
	json.Unmarshal(weather, &raw)
	out, _ := json.Marshal(raw)
	println(string(out))
}
