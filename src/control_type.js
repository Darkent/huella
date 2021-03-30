
 function type(times,group_register){
    let t = [];
    let minute_late = times.minutes;
    let morning_entry = string_date(times.morning_entry,minute_late);
    let afternoon_entry = string_date(times.afternoon_entry,minute_late);
    let morning_departure = string_date(times.morning_departure,minute_late);
    let afternoon_departure = string_date(times.afternoon_departure,minute_late);

    for (var  i = 0 ; i < group_register.length ; i ++){
        let registers = group_register[i];
        let object_insert = {};
        registers.forEach((register)=>{
        let register_date = new Date(register.time);

         let object_type =   type_check(register.type,morning_departure,register_date);
         
         late(object_insert,object_type,morning_entry,afternoon_entry,morning_departure,afternoon_departure);
          
        })
        t.push(object_insert);
    }
    return t;
}

function late(obj,object,me,ae,md,ad){
    let key = Object.keys(object)[0];
    let time = object[key];
    switch (key) {
        case "morning_entry":
            exists_property(obj,key,  time_late(time,me))
           break;
            
        case "afternoon_entry":
            exists_property(obj,key,  time_late(time,ae))
          break;
            
        case "morning_departure":
          
            exists_property(obj,key,  {"hora":time})
          break;
            
        default:
            exists_property(obj,key,{"hora":time})
            break;
            
    }
}

function  exists_property(obj,key,data){
    if(obj[key]){
        obj[key].push(data);
    }else{
        obj[key]=[data];
    }
}

function time_late(time,limit){
    if(time.getTime() > limit.getTime()){
        return {"tarde":time}
    }else{
        return {"hora":time}
    }
}

function type_check(check,limit,time){
    if(check == "Check-in"){
        if(limit.getTime() > time.getTime()){
            return {morning_entry:new Date(time)}
         
        }else{
            return {afternoon_entry:new Date(time)}
        }
    }else{
        if(limit.getTime() > time.getTime()){
            return {morning_departure:new Date(time)}
        }else{
            return {afternoon_departure:new Date(time)}
        }

    }
}
function format(obj,property){
    let key = Object.keys(property_value)[0];
    if(key === undefined){
        obj[key]=[property];
    }else{
        obj[key].push(property)
    }
    return obj;
}
function string_date(date_string,minute_late){
    let hour = h(date_string.split(":")[0]);
    let minute = m(date_string.split(":")[1],minute_late);
    let date = new Date().toISOString().substr(0,11).concat(`${hour}:${minute}`,':00.000Z');

    return new Date(date);
}

function h(v){
    let test = Number(v);
    return test > 9 ? `${test}` : `0${test}`
}

function m(v,a){
 
    let test = (Number(v) + Number(a));
    return test > 9 ? `${test}` : `0${test}`
}


module.exports = type;