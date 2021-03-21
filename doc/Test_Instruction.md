# Test Instruction
## Installation
1. Check if Java JRE and JDK is installed 
- `java -version` 
- `javac -version`

2. Install Java JRE and JDK 
- `sudo apt install openjdk-11-jre-headless`
- `sudo apt install openjdk-11-jdk-headless`
3. Clone Test Script and JMeter
4. Modify file server_ip.csv on folder Test if you testing different server

## Command runing test
After Jmeter and test script ready move to Jmeter bin directory to run these comand for testing 
### 1. Insert Test
Note here

`sudo sh jmeter -n -t ~/TestScript/Test/TestInsert.jmx -l ~/TestScript/result/VM_Insert.csv`
### 2. Select Test
Note here

`sudo sh jmeter -n -t ~/TestScript/Test/TestSelect.jmx -l ~/TestScript/result/VM_Select.csv`
### 3. Update Test
Note: Before runing update test you need to modify value in database on table `groups` field `verified_email` from 0 to 1 this will alow user login whithout need to verified email manualy

`sudo sh jmeter -n -t ~/TestScript/Test/TestUpdate.jmx -l ~/TestScript/result/VM_Update.csv`

### 4. Delete Test
Note: Before runing delete test you need modify data on 

`sudo sh jmeter -n -t ~/TestScript/Test/TestDelete.jmx -l ~/TestScript/result/VM_Delete.csv`

## Command Generate Report File
After test done go back to jMeter bin directory and run these script to genereate reporting file

1. Insert Test

`sudo sh jmeter -g  ~/TestScript/result/VM_Insert.csv -o ~/TestScript/result/VM_Insert`

2. Select Test

`sudo sh jmeter -g  ~/TestScript/result/VM_Select.csv -o ~/TestScript/result/VM_Select`

3. Update Test

`sudo sh jmeter -g  ~/TestScript/result/VM_Update.csv -o ~/TestScript/result/VM_Update`

4. Delete Test

`sudo sh jmeter -g ~/TestScript/result/VM_Delete.csv -o ~/TestScript/result/VM_Delete`

"For generating reporting only do on local machine and do not do it on server and push it on test script repo"