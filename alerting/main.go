package main

import (
	"context"
	"encoding/json"
	"fmt"
	"os"

	"github.com/docker/docker/api/types"
	"github.com/docker/docker/client"

	"github.com/resend/resend-go/v2"
)

// Alert represents an alert message
type Alert struct {
	Subject string
	Body    string
}


// CheckContainers checks if any running container exceeds a memory limit
func CheckContainers() {
	os.Setenv("DOCKER_HOST", "unix:///var/run/docker.sock")

	clientEmail := resend.NewClient("re_iJETSGad_7UUXidWRUprqfzkzAZ2iGp2M")
	params := &resend.SendEmailRequest{
		From:    "Acme <onboarding@resend.dev>",
		To:      []string{"amanupadhyay2004@gmail.com"},
		Html:    "<strong>hello world</strong>",
		Subject: "Hello from Golang",
	}
	ctx := context.Background()
	cli, err := client.NewClientWithOpts(client.FromEnv, client.WithAPIVersionNegotiation())
	if err != nil {
		panic(err)
	}

	containers, err := cli.ContainerList(ctx, types.ContainerListOptions{})
	if err != nil {
		panic(err)
	}

	for _, container := range containers {
		stats, _ := cli.ContainerStats(ctx, container.ID, false)
		dec := json.NewDecoder(stats.Body)
		var v types.StatsJSON
		if err := dec.Decode(&v); err != nil {
			panic(err)
		}

		memUsage := (float64(v.MemoryStats.Usage) / float64(v.MemoryStats.Limit)) * 100
		fmt.Println(memUsage)
		cpuUsage := (float64(v.CPUStats.CPUUsage.TotalUsage) / float64(v.CPUStats.SystemUsage)) * 100
		fmt.Println(cpuUsage)

		if memUsage > 0 || cpuUsage > 0 {
			params.Html = fmt.Sprintf("<strong>Container %s is using more than 80%% of its resource limits.</strong>", container.ID)
			// SendEmail(alert)
			clientEmail.Emails.Send(params)
			fmt.Println("Email sent")
		}

		// if memUsage > 0.9 || cpuUsage > 0.9 {
		// 	if err := cli.ContainerStop(ctx, container.ID, ); err != nil {
		// 		panic(err)
		// 	}
		// 	alert := Alert{
		// 		Subject: "Container stopped",
		// 		Body:    fmt.Sprintf("Container %s has been stopped due to excessive resource usage.", container.ID),
		// 	}
		// 	SendEmail(alert)
		// }
		clientEmail.Emails.Send(params)
	}
}

func main() {
	CheckContainers()
}
