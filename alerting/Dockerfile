# Build stage
FROM golang:1.22-alpine3.19 AS builder

WORKDIR /app

# Copy the Go modules files
COPY go.mod .
COPY go.sum .

# Download dependencies
RUN go mod download

# Copy the rest of the application source code
COPY . .

# Build the application
RUN CGO_ENABLED=0 GOOS=linux go build -o app .

# Final stage
FROM alpine:latest

# Install necessary libraries and tools
RUN apk --no-cache add ca-certificates

# Copy the built binary from the build stage
COPY --from=builder /app/app /app/app

# Expose port 8080
EXPOSE 8080

# Set the entry point to run the application
CMD ["/app/app"]