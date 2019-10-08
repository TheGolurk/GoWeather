package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
)

func main() {
	e := echo.New()
	e.Static("/", "public")
	e.POST("/getWeather", request)

	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{echo.POST},
	}))

	err := e.Start(":5000")
	if err != nil {
		log.Fatal("error en el servidor: ", err)
	}

}

// Model is the json's data for the fronted request
type Model struct {
	Country string `json:"Country"`
	City    string `json:"City"`
}

func request(c echo.Context) error {
	//GET request from open weather

	// country := c.FormValue("country")
	// city := c.FormValue("city")

	var url string

	m := &Model{}
	err := c.Bind(m)
	if err != nil {
		return c.JSON(http.StatusBadRequest, "el objeto enviado no es el correcto")
	}

	url = fmt.Sprintf("http://api.openweathermap.org/data/2.5/weather?q=%s,%s&appid=fef09f9cd856af32af153efcf53391dd", m.Country, m.City)

	res, err := http.Get(url)
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

	return c.JSON(http.StatusOK, raw)
}
