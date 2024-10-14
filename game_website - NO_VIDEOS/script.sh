#!/bin/bash

# Variables (edit these as needed)
SERVICE_NAME="your-daemon"
GO_EXECUTABLE="your-daemon"
GO_SOURCE_FILE="your-daemon.go"
INSTALL_DIR="/usr/local/bin"
SERVICE_FILE="/etc/systemd/system/$SERVICE_NAME.service"
USER=$(whoami)
CONFIG_DIR="$HOME/.config/go-backup"
TOML_FILE="$CONFIG_DIR/go-backup.toml"

# Step 1: Create the .config/go-backup folder and generate go-backup.toml template
echo "Setting up go-backup folder and generating go-backup.toml template..."

# Check if .config directory exists, then create go-backup directory
mkdir -p "$CONFIG_DIR"
if [ $? -ne 0 ]; then
    echo "Error: Failed to create $CONFIG_DIR."
    exit 1
fi

# Create a default go-backup.toml file if it doesn't exist
if [ ! -f "$TOML_FILE" ]; then
    echo "Creating default go-backup.toml template..."
    cat > "$TOML_FILE" <<EOL
# go-backup.toml configuration file

[backup]
# Source directory to backup
source = "/path/to/source"

# Destination directory for backup
destination = "/path/to/destination"

# Backup interval (in minutes)
interval = 60

# Enable compression (true or false)
compress = true
EOL
    if [ $? -ne 0 ]; then
        echo "Error: Failed to create $TOML_FILE."
        exit 1
    fi
    echo "Default go-backup.toml template has been created in $CONFIG_DIR."
else
    echo "$TOML_FILE already exists, skipping template creation."
fi

# Step 2: Build the Golang executable
echo "Building Go executable..."
if [ -f "$GO_SOURCE_FILE" ]; then
    go build -o "$INSTALL_DIR/$GO_EXECUTABLE" "$GO_SOURCE_FILE"
    if [ $? -ne 0 ]; then
        echo "Error: Failed to build the Go executable."
        exit 1
    fi
    echo "Go executable built successfully."
else
    echo "Error: Go source file '$GO_SOURCE_FILE' not found."
    exit 1
fi

# Step 3: Create the systemd service file
echo "Creating systemd service file..."
sudo bash -c "cat > $SERVICE_FILE <<EOL
[Unit]
Description=Your Go Daemon Service
After=network.target

[Service]
ExecStart=$INSTALL_DIR/$GO_EXECUTABLE
Restart=always
RestartSec=10
User=$USER
WorkingDirectory=$INSTALL_DIR
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=multi-user.target
EOL"

if [ $? -ne 0 ]; then
    echo "Error: Failed to create systemd service file."
    exit 1
fi
echo "Service file created at $SERVICE_FILE."

# Step 4: Reload systemd daemon
echo "Reloading systemd daemon..."
sudo systemctl daemon-reload
if [ $? -ne 0 ]; then
    echo "Error: Failed to reload systemd daemon."
    exit 1
fi

# Step 5: Enable the service to start on boot
echo "Enabling $SERVICE_NAME service to start on boot..."
sudo systemctl enable "$SERVICE_NAME.service"
if [ $? -ne 0 ]; then
    echo "Error: Failed to enable the service."
    exit 1
fi
echo "Service enabled successfully."

# Step 6: Start the service
echo "Starting $SERVICE_NAME service..."
sudo systemctl start "$SERVICE_NAME.service"
if [ $? -ne 0 ]; then
    echo "Error: Failed to start the service."
    exit 1
fi

# Step 7: Display the status of the service
sudo systemctl status "$SERVICE_NAME.service"

echo "$SERVICE_NAME service setup is complete and running."
echo "go-backup.toml template has been successfully created in $CONFIG_DIR."
