#!/bin/sh
#Before runing the file make sure set its permission 
#chmod +x script/setupQemu.sh

#run the script using 
#sudo script/setupQemu.sh

#Install Qemu
echo Install Qemu
apt-get update
apt-get install -y qemu qemu-kvm libvirt-bin  bridge-utils  virt-manager
service libvirtd start
update-rc.d libvirtd enable

#Check status
echo Check Qemu status
service libvirtd status