#!/bin/bash

sudo apt-add-repository ppa:cubic-wizard/release -y
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 6494C6D6997C215E
sudo apt update && sudo apt install cubic -y


