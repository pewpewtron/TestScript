#!/bin/sh

set -eu -o pipefail

sudo -n true
test $? -eq 0 || exit 1

#Update Package
echo Update Pakcage
apt-get update

# Add Docker repo
echo add Docker repo
sudo apt install apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable"

#Update pakcage
echo Update Package with docker repo
sudo apt update
apt-cache policy docker-ce

#Install Docker
echo Intsall Docker
sudo apt install docker-ce

echo install docker compose
#Downlaod docker compose from git repo
echo download docker compose repo
sudo curl -L https://github.com/docker/compose/releases/download/2.0.1/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose

#set permissions
echo add permissions
sudo chmod +x /usr/local/bin/docker-compose