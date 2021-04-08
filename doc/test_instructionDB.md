# Test Instruction DB test
## Prerequisites
1. SSH connection with port forwarding is established between DB server and JMeter server

`ssh -L 3306:localhost:3306 user@yourserver.com`

2. For testing Update and Delete you need to backup participant id to [participants_id.csv](Test/participants_id.csv) 

## Command runing test and Generate Report File
After Jmeter and test script ready move to Jmeter bin directory to run comand for testing and after test done go back to jMeter bin directory and run generate report script to genereate reporting file
### 1. Insert Test
Runing Test

`sudo sh jmeter -n -t ~/TestScript/Test/TestInsertDB.jmx -l ~/TestScript/result/VM_InsertDB.csv`

Generate Report

`sudo sh jmeter -g  ~/TestScript/result/VM_InsertDB.csv -o ~/TestScript/result/VM_InsertDB`
### 2. Select Test
Runing Test

`sudo sh jmeter -n -t ~/TestScript/Test/TestSelectDB.jmx -l ~/TestScript/result/VM_SelectDB.csv`

Generate Report

`sudo sh jmeter -g  ~/TestScript/result/VM_SelectDB.csv -o ~/TestScript/result/VM_SelectDB`
### 3. Update Test*
Runing Test

`sudo sh jmeter -n -t ~/TestScript/Test/TestUpdateDB.jmx -l ~/TestScript/result/VM_UpdateDB.csv`

Generate Report

`sudo sh jmeter -g  ~/TestScript/result/VM_UpdateDB.csv -o ~/TestScript/result/VM_UpdateDB`
### 4. Delete Test*
Runing Test

`sudo sh jmeter -n -t ~/TestScript/Test/TestDeleteDB.jmx -l ~/TestScript/result/VM_DeleteDB.csv`

Generate Report

`sudo sh jmeter -g ~/TestScript/result/VM_DeleteDB.csv -o ~/TestScript/result/VM_DeleteDB`

"For generating reporting only do on local machine and do not do it on server and push it on test script repo"

"For generating reporting only do on local machine and do not do it on server and push it on test script repo"