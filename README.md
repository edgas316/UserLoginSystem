# UserLoginSystem
##> seting up mongo db
######go to your mongodb dirrectory "bin folder"
>C:\mongodb\bin> 
######then run the following command
>mongod --directoryperdb --dbpath C:\mongodb\data\db --logpath C:\mongodb\log\mongodb.log --logappend -rest --install
######then run following commands
>net start MongoDB
#
>mongo
#
>db
#
>show dbs
######this will switch to your desired DB
>use nameOfDb
#
>show collections
#
>db.createCollection('nameOfCollection-ex-users')
#
>show dbs
######run the following to create user...
>db.nameOfCollection.insert({"name":"Your Name", "username":"Username", "password":"1234","email":"youremail@gmail.com",});
######run the following to see data
>db.users.find().pretty()
##> creating the application
###### go to the project folder in cmd and run following command // but before you have to have express installed globally
> express
###### open package.json and add all dependencies you are going to use in your application
###### then run installation
>npm install
###### go to app.js and include/require modules in your application
#### passport middle-ware should be after express middle-ware!!! 
##> Setting up bcrypt for password encryption 
- Instal Visiual Studio 2013 Community
[https://www.visualstudio.com/en-us/downloads/download-visual-studio-vs.aspx]()
- Install Visual C++ 2008 Redistributables (x64)
[http://slproweb.com/products/Win32OpenSSL.html]()
- Install OpenSSL FULL
[http://slproweb.com/products/Win32OpenSSL.html]()
- Install Python
- Install Node-gyp
>npm install -g node-gyp
- Install bcrypt
>npm install bcrypt
- You may need to do this
>npm install bcrypt --msvs_version=2013

