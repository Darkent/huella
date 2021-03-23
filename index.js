const express = require ("express");
const ZKLib = require('zklib');
const app = express();

app.listen(5000,()=>{
    console.log("El servidor esta corriendo");
});

ZK = new ZKLib({
    ip: '192.168.5.11',
    port: 4370,
    inport: 5200,
    timeout: 5000,
  });
   
  // connect to access control device
  ZK.connect(function(err) {
    if (err) throw err;
   
    // read the time info from th device
    ZK.getTime(function(err, t) {
      // disconnect from the device
  
      ZK.disconnect();
      if (err) throw err;
   
      console.log("Device clock's time is " + t.toString());
    });
ZK.getAttendance((function(err,data){
    console.log(data);

    if(err) throw err;
}))
    
  });