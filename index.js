


const { default: axios } = require('axios');


const request = async()=>{
    for(let i = 1001; i<10000; i++){
        console.log(i+1);
        let payload = {
            "id": i,
            "unix_ts": 1684129671+i,
            "user_id": 123456,
            "event_name": "login"
        };    
        if(i%2 ===0){
            payload['event_name'] = "good";
            console.log('good');

        }

        let {data: { data }} = await axios.post("http://localhost:10040/log", payload);
        console.log(data);
    }
}

request();