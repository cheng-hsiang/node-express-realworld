node express realworld



1. create docker 

`sudo docker run -itd --name mongo -p 27017:27017 mongo`
`sudo docker exec -it mongo mongo admin`
`db.createUser({ user:'admin',pwd:'123456',roles:[ { role:'userAdminAnyDatabase', db: 'admin'},"readWriteAnyDatabase"]});`

2. node app.js