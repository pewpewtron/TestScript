# Test Instruction
## Prerequisites
1. For update test you need to modify value in database on table `groups` field `verified_email` from 0 to 1 this will alow user login whithout need to verified email manualy and backup username field to [group_username.csv](Test/group_username.csv).
2. For delete test you need modify data in database on table `participants` field `group_id` and `captain`. field `group_id` shoud be change to group id from main test user, field `captain` will be set to 0. backup id to file [participants_id.csv](Test/participants_id.csv).
 
## Command runing test and Generate Report File
After Jmeter and test script ready move to Jmeter bin directory to run comand for testing and after test done go back to jMeter bin directory and run generate report script to genereate reporting file
### 1. Insert Test
Runing Test

`sudo sh jmeter -n -t ~/TestScript/Test/TestInsert.jmx -l ~/TestScript/result/VM_Insert.csv`

Generate Report

`sudo sh jmeter -g  ~/TestScript/result/VM_Insert.csv -o ~/TestScript/result/VM_Insert`
### 2. Select Test
Runing Test

`sudo sh jmeter -n -t ~/TestScript/Test/TestSelect.jmx -l ~/TestScript/result/VM_Select.csv`

Generate Report

`sudo sh jmeter -g  ~/TestScript/result/VM_Select.csv -o ~/TestScript/result/VM_Select`
### 3. Update Test*
Runing Test

`sudo sh jmeter -n -t ~/TestScript/Test/TestUpdate.jmx -l ~/TestScript/result/VM_Update.csv`

Generate Report

`sudo sh jmeter -g  ~/TestScript/result/VM_Update.csv -o ~/TestScript/result/VM_Update`
### 4. Delete Test*
Runing Test

`sudo sh jmeter -n -t ~/TestScript/Test/TestDelete.jmx -l ~/TestScript/result/VM_Delete.csv`

Generate Report

`sudo sh jmeter -g ~/TestScript/result/VM_Delete.csv -o ~/TestScript/result/VM_Delete`

"For generating reporting only do on local machine and do not do it on server and push it on test script repo"