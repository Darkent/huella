function assistes(last_register){
    let rd = Math.round(Math.random()*10) + 1 ;
    let rd_hour = Array.from({length:last_register+rd},(_,i)=> Math.round(Math.random()*17) + 2);
    rd_hour.sort((a,b)=>a-b)
    let rd_minute = Array.from({length:last_register+rd},(_,i)=> Math.round(Math.random()*55) + 2);

    let registers = [];
    for( var i = 0 ; i < (last_register + rd) ; i++){
        let hour = rd_hour[i];
        let minute = rd_minute[i];      
        let set_hour = hour > 9 ? hour.toString():`0${hour}`;
        let set_minute = minute > 9 ? minute.toString():`0${minute}`
        let test_date = new Date().toISOString();
        registers.push({
            uid:(i+1),
            id:rd_ids() || 13,
            time:new Date(test_date.substr(0,11).concat(set_hour,':',set_minute,':00.000Z')).toISOString(),
            name:"test",
            type:hour%2 == 0 ? "Check-in":"Check-out"
        });
    }
    
    return registers;
}

let ids = [47,58,13]
function rd_ids(){
    let rd = Math.round(Math.random()*3)-1;
    return ids[rd];
}
module.exports = {assistes,rd_ids};

// var x = {
//     uid:1,
//     id:2,
//     name:"sdds",
    
// }