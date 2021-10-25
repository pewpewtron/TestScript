#!/bin/sh
#Before runing the file make sure set its permission 
#chmod +x script/deployVm.sh

#run the script using 
#sudo script/deployVm.sh


#Download Ubuntu ISO
echo download Ubuntu ISO
wget http://releases.ubuntu.com/18.04.4/ubuntu-18.04.4-live-server-amd64.iso?_ga=2.17338928.809071564.1585082124-624042363.1585082124 -O /mnt/ubuntu.iso 

#Create VM
echo Create VM
virt-install --virt-type=kvm \ 
--name=17cc-guest \ 
--ram 6024 \ 
--vcpus=2 \ 
--virt-type=kvm --hvm \ 
--cdrom /mnt/ubuntu.iso \ 
--network network=default \ 
--disk pool=vms-store,size=15,bus=virtio,format=qcow2 \ 
--graphics vnc 

#Get VNC port
echo Get VNC port from VM
sudo virsh dumpxml 17cc-nested | grep vnc 