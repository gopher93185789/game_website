package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

var Visits int


func visithandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if r.Method != "GET" {
		http.Error(w, "This route only supports 'GET' requests.", http.StatusBadRequest)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]int{"visits": Visits})
}


func counthandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if r.Method != "GET" {
		http.Error(w, "This route only supports 'GET' requests.", http.StatusBadRequest)
		return
	}

	Visits++
	w.WriteHeader(http.StatusOK) 
	json.NewEncoder(w).Encode("Visit count incremented")
}

func main() {
	router := http.NewServeMux()

	router.HandleFunc("/visits", visithandler)
	router.HandleFunc("/count", counthandler)

	srv := http.Server{
		Addr:    ":8080",
		Handler: router,
	}


	fmt.Println("Server running on port :8080")
	if err := srv.ListenAndServe(); err != nil {
		fmt.Println("Failed to start server:", err)
	}
}
