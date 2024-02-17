package main

import (
	"context"
	"encoding/json"
	"log"
	"net/http"
	"os"

	"github.com/docker/docker/api/types"
	"github.com/docker/docker/client"
	"github.com/gorilla/mux"
	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func main() {
	r := mux.NewRouter()
	r.HandleFunc("/ws/{containerId}/stats", wsHandler)
	http.Handle("/", r)

	log.Println("Starting server on :8080...")
	log.Fatal(http.ListenAndServe(":8080", nil))
}

func wsHandler(w http.ResponseWriter, r *http.Request) {
	os.Setenv("DOCKER_HOST", "unix:///var/run/docker.sock")
	vars := mux.Vars(r)
	containerID := vars["containerId"]

	cli, err := client.NewClientWithOpts(client.FromEnv)
	if err != nil {
		log.Printf("Failed to create docker client: %s\n", err)
		return
	}

	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Printf("Failed to upgrade connection to WebSocket: %s\n", err)
		return
	}
	defer conn.Close()

	ctx := context.Background()

	for {
		stats, err := cli.ContainerStats(ctx, containerID, false)
		if err != nil {
			log.Printf("Failed to get container stats: %s\n", err)
			return
		}

		var stat types.StatsJSON
		if err := json.NewDecoder(stats.Body).Decode(&stat); err != nil {
			log.Printf("Failed to decode stats: %s\n", err)
			return
		}

		if err := conn.WriteJSON(stat); err != nil {
			log.Printf("Failed to send stats over WebSocket: %s\n", err)
			return
		}

		stats.Body.Close()
	}
}

