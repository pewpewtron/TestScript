# Infrastructure Deployment

On this folder contain ARM template for infrastructure deployment for this project, deployment covers two target servers and one Load server.

## Target Servers (17ccServers)
Target servers contain 2 VM on azure for testing web app running under docker and web app running under qemu.

The target servers will be deploy using linked template consist of 3 json files. The main template called [17ccServers.json](17ccServers.json) this file will create resource that will be shared by both vm such as Storage Accounts, NSG (Network Security Group), and Virtual Network. 17ccServers folder store remaining template for deploying VM

![ServersDiagram](17ccServers/ServersDiagram.png)

### 1. [Docker server](17ccServers/17ccDocker.json)
Docker server deployment consist of one Public IP address, one Network Interface, and VM using size Standard_D2s_v3 with 2vCPU, 8GB of RAM, with osDisk using StandardSSD with LRS for redundancy, the vm also have boot diagnostic turn on using storage account that provision by main template.

### 2. [VM server](17ccServers/17ccDocker.json)
VM server deployment consist of two public ip address required for qemu, a Network Interface where the ip will be assign to, 2 separate disk both using StandardSSD with LRS for redundancy the first one is osDisk where host os will be store and the second one is dataDisk where guest os will be store, provision of dataDisk is separate from the VM itself and then will be attach when the VM is provision. the VM size used is the same as Docker server and boot diagnostic turn on using the same storage account as docker server.
## Load Servers

# Deployment