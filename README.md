# TestScript
Test Script used to test performance between server using VM and Docker.

# Getting Started 

Test Script developed for testing Information Technology, Udayana University ITCC website to test insert, select, update and delete. Source code needs to be deployed before testing can be performed.

# Prerequisites 

In order to run this test script you need to install Java and JMeter

[ITCC](https://github.com/pewpewtron/17cc) Source Code

[Java](https://docs.oracle.com/javase/8/docs/technotes/guides/install/install_overview.html) is installed

[JMeter](http://jmeter.apache.org/download_jmeter.cgi) is installed

1. Check if Java JRE and JDK is installed 
- `java -version` 
- `javac -version`
2. Install Java JRE and JDK 
- `sudo apt install openjdk-11-jre-headless`
- `sudo apt install openjdk-11-jdk-headless`
3. Clone Test Script and JMeter
4. Modify file [server_ip.csv](Test/server_ip.csv) in folder Test if you testing different server

# Running the tests 
[Test Instruction Web](doc/test_instruction.md)

[Test Instruction DB](doc/test_instructionDB.md)

# Test Result
Test result can be found in result folder, recap result can be found in [result](doc/result.md)