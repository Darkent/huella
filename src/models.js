function models(personal_ids,situation_ids,assistance){
time = Date.now();
//2021-03-25T23:24:43.582Z
let register_to_insert = [];
    for (var i = 0 ; i < personal_ids.length ; i ++){
        let personal_id = personal_ids[i];
        let situation_id = situation_ids[i];
        let ass = assistance[i];
        register_to_insert.push({
            personal_id,
            institution_id:1,
            situation_id,
            uid:ass.uid,
            hour:ass.time.split("T")[1].split(":")[0],
            ballot_id:1,
            month:ass.time.split("-")[1],
            date:ass.time.split("T")[0].split("-").reverse().join("-"),
            collective_period:ass.time.split("T")[0].substr(0,7),
          
        });
    }

 return register_to_insert;
}


module.exports = {models};
