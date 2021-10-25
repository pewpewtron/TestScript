#!/bin/sh
#Before runing the file make sure set its permission 
#chmod +x script/setupVM.sh

#run the script using 
#sudo script/setupVM.sh

#Install PHP 7.4
echo Install PHP 7.4
apt-get install php7.4-fpm php7.4-xml php7.4-mysql php7.4-mbstring php7.4-zip unzip -y

#install NGINX
echo Install webserver
apt-get install nginx -y

#Install Database
echo Install Database
wget https://dev.mysql.com/get/mysql-apt-config_0.8.12-1_all.deb
sudo dpkg -i mysql-apt-config_0.8.12-1_all.deb
sudo apt-get update
sudo apt-cache policy mysql-server 
apt install -f mysql-client=5.7.33-1ubuntu18.04 mysql-community server=5.7.33-1ubuntu18.04 mysql-server=5.7.33-1ubuntu18.04
sudo apt-get install mysql-server -y
