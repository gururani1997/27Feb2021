About the project:--



=====================Simple start server==================
go to root dir and enter below command
"node ."


======================Devloper mode=======================
go to root dir and enter below command
"nodemon server/server.js"

for more see:-
https://www.npmjs.com/package/nodemon

=======================Production mode====================
"pm2 start server/server.js" //for start
"pm2 stop ProjectId"  // for stop

for more see:-
"https://pm2.io/doc/en/runtime/overview/?utm_source=pm2&utm_medium=website&utm_campaign=rebranding"

=========================================================
I have used  default loopback as well as addition routes for admin section
server/boot/admin-user-function.js  //admin user section
server/boot/admin-biller-function.js //admin biller section

server/boot/mobile-function // mobile additional routes with function else functions are coming from loopback default

====================For schedule related function / cron jobs=====================================
server/boot/schedule-function 

