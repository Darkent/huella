const connection = require("./db")

exports.get_schedule = ()=>{
    return new Promise((resolve,reject)=>{
        
        let query = 'SELECT * FROM setting';
      
    connection.query(query,(err,rows)=>{
        if(err)  reject(err);
        var x = rows[0];
        let times = {
            morning_entry : x.entry_time_tomorrow,
            morning_departure: x.departure_time_tomorrow,
            //HORA CLAVE
            afternoon_entry:x.entry_time_late,
            afternoon_departure:x.departure_time_late,
            minutes:x.late_minutes
        }
    
     resolve(times)
        
    });
  
    });
}


exports.last_assist = ()=>{
    return new Promise((resolve,reject)=>{
        
        let query = 'SELECT * FROM assists WHERE id=(SELECT max(id) FROM assists)';
      
    connection.query(query,(err,rows)=>{
        if(err)  reject(err);
     if(rows.length == 0){
        resolve(0);
     }else{

         resolve(rows[0].uid)
     }
        
    });
  
    });

}
exports.read = (uid)=>{
    return new Promise((resolve,reject)=>{
        
        //let query = 'SELECT * FROM assists WHERE id=(SELECT max(id) FROM assists)';
        let query = `SELECT id FROM users WHERE uid=${uid}`
    connection.query(query,(err,rows)=>{
        if(err)  reject(err);
     
     resolve(rows[0].id)
        
    });
  
    });

}


exports.search_situation = (id)=>{
    return new Promise((resolve,reject)=>{
        
       
        let query = `SELECT situation_id FROM linklabor_ugel WHERE personal_id=${id}`
    connection.query(query,(err,rows)=>{
        if(err)  reject(err);
     
     resolve(rows[0].situation_id)
        
    });
  
    });
}
exports.exists = async (personal_id)=>{
    return new Promise((resolve,reject)=>{
        connection.query(`select * from assists where personal_id=${personal_id}`,(err,row)=>{
            if(err) throw err;
            resolve(row);
        });
    })
}

exports.update = async(objects,id)=>{

    Object.keys(objects).forEach((property)=>{
        objects[property].forEach((to_save)=>{
            let key = Object.keys(to_save)[0];
            let value = JSON.stringify(Object.values(to_save)[0]);
            let save = JSON.stringify(key);
            let query_dos = `SELECT ${property} FROM assists WHERE id=${id}`;
            let query = '';
            let x = '';
            value = JSON.stringify(value.split("T")[1].split(".")[0]);
            connection.query(query_dos,(err,row)=>{
                if(err)throw err;
              
                if(row[0][property] == null){

                    
                  
                  query = `UPDATE assists SET ${property} = JSON_ARRAY(JSON_OBJECT(${save},${value})) where id=${id} `  
                }else{
                    
             query = `UPDATE assists SET ${property} = JSON_ARRAY_INSERT(${property},'$[0]',JSON_OBJECT(${save},${value})) where id=${id}`
      
                }
     console.log(query);
                connection.query(query,(err,row)=>{

                    if(err) throw err;
                            console.log("Actualizado"); 
                })
            });
       
        })
    })
    
}


exports.insert =  async (current_register)=>{
  
       
  
        let keys = Object.keys(current_register).join(',');
        let keys_length = Array.from({length:Object.keys(current_register).length},(_,i)=> '?').join(',');
        let values = []
         Object.values(current_register).forEach((value)=>{
         
             if(typeof value == "object"){
               
                value.forEach((e)=>{
                    let key = Object.keys(e)[0]
                    let _value = JSON.stringify(Object.values(e)[0])
                    _value = _value.split("T")[1].split(".")[0];
               
                    e[key] =_value
                 
                })
            
                let value_str = JSON.stringify(value);
    
            values.push("'".concat(value_str,"'"));
             }else{
                values.push(JSON.stringify(value))
             }
             
         });
       let query = `insert into assists (${keys})values(${values.join(',')})`;
    
            connection.query(query,(err,res)=>{
                    if(err) throw err;
                    console.log("Nuevo",res.insertId);            
                });
    
      
   

  
    


}