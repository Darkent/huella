const express = require ("express");
const app = express();
const jobs = require("./src/job.js")
const repository = require("./src/repository.js");
const controller = require("./src/controllers");
const ZKLib = require("node-zklib");
app.listen(5000,()=>{
    console.log("El servidor esta corriendo");
});

jobs.job();






// const job = schelude.scheduleJob('*/1 * * * *',function(){
//     console.log(new Date());
// })

// const test = async () => {
 
 
//     let zkInstance = new ZKLib('192.168.0.201', 4370, 10000, 5000);
//     // try {
//     //     // Create socket to machine 
//     //     await zkInstance.createSocket()
 
 
//     //     // Get general info like logCapacity, user counts, logs count
//     //     // It's really useful to check the status of device 
//     //     console.log(await zkInstance.getInfo())
//     // } catch (e) {
//     //     console.log(e)
//     //     if (e.code === 'EADDRINUSE') {
//     //     }
//     // }
//     // Get users in machine 
//     // const users = await zkInstance.getUsers()
//     // console.log(users)
//     // Get all logs in the machine 
//     // Currently, there is no filter to take data, it just takes all !!
//     // const logs = await zkInstance.getAttendances()

//     zkInstance.getRealTimeLogs((data)=>{
//         // do something when some checkin 
//         console.log(data)
//     })
 
 
 
//     // delete the data in machine
//     // You should do this when there are too many data in the machine, this issue can slow down machine 
//    // zkInstance.clearAttendanceLog();
 
 
//     // Disconnect the machine ( don't do this when you need realtime update :))) 
   
// }
 
// test()