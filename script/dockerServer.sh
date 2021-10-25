#!/bin/sh

#Before runing the file make sure set its permission 
#chmod +x script/dockerServer.sh

#run the script using 
#sudo script/dockerServer.sh

#Update Package
echo Update Pakcage
apt-get update

# Add Docker repo
echo add Docker repo
apt install apt-transport-https ca-certificates curl software-properties-common -y
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add -
add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable"

#Update pakcage
echo Update Package with docker repo
apt update
apt-cache policy docker-ce

#Install Docker
echo Intsall Docker -y
apt install docker-ce

echo install docker compose
#Downlaod docker compose from git repo
echo download docker compose repo
curl -L https://github.com/docker/compose/releases/download/1.21.2/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose

#set permissions
echo add permissions
chmod +x /usr/local/bin/docker-compose

# Check Docker and compose version
docker -v
docker-compose --version