const schedule = require("node-schedule");
const controller = require("./controllers");
const repository = require("./repository");
const model = require("./models");
const control = require("./control_type");
// const job = schedule.scheduleJob('*/1 * * * *',async ()=>{
//     let ultima_asistencia = await controller.read(47).then( (id)=>  controller.search_situation(id));

//     console.log("Tarea con ",ultima_asistencia);
// });

//personal id 1 2 3
//uid         47 58 13
//situation   78 15 80

const job =async ()=>{
    let times = await controller.get_schedule();
    let ultima_asistencia = await controller.last_assist();
    let generate_register =  repository.assistes(ultima_asistencia);
    let filter = generate_register.filter((element)=> element.uid > ultima_asistencia);
    let unique =Array.from( new Set(filter.map((element)=>element.id)));
    let id_users = [];
        for (var i = 0 ; i< unique.length ; i++){
            let id_machine = await controller.read(unique[i]);
            id_users.push(id_machine);
        }
  
    let situation_id = [];
    for (var i = 0 ; i< id_users.length ; i++){
        let st = await controller.search_situation(id_users[i]);
        situation_id.push(st);
    }
    let final = [];
    unique.forEach((element)=>{
        let temp = filter.filter((e)=>e.id == element);
        final.push(temp);
    });

  let times_to_save =  control(times,final);
    let updated = [];
   let register_to_save = model.models(id_users,situation_id,filter);
   
   for(var i = 0 ; i < register_to_save.length ; i++){
        
       let object = times_to_save[i];
        let object_save = register_to_save[i];
        let row = await controller.exists(object_save.personal_id);
        
        if(row.length!==0){
            updated.push(object_save.personal_id);
            controller.update(object,row[0].id)
        }else{
            Object.keys(object).forEach((key)=>{
                object_save[key]=object[key];
               })

               controller.insert(object_save);
        }
       
   }

  // console.log(updated);
 //   controller.insert(register_to_save);
}

module.exports = {job};