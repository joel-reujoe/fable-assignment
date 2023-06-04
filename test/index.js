


const { default: axios } = require('axios');


const request = async()=>{
    console.log('hi')
    for(let i = 0; i<10; i++){
        console.log(i+1);
        let payload = {
            "id": i,
            "unix_ts": 1684129671+i,
            "user_id": 10+i,
            "event_name": `login${i}`
        };    
        if(i%2 ===0){
            payload['event_name'] = "good";

        }

        try{
            await axios.post("http://host.docker.internal:8000/log", payload);
        }catch(e){
            console.log(e);
        }
    }
}

request();