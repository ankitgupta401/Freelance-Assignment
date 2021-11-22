const axios = require('axios');


//get request
exports.customRequest = async(config)=>{
    let {url,header,method,body} = config;
    let Header = header?header:{};
    let Method = method?method:"get";
    let Body = body?body:{};
    console.log(url)
    if(Method==="post"){
        try{
            const response = await axios.post(url,Body,{
                headers:Header
            });

            return response.data;
        }
        catch(err){
            console.log(err);
            return { status: false, message: 'isp failed' }
        }
    }
    else{
        try{
            const response = await axios.get(url,{headers:Header});

            return response.data;
        }
        catch(err){
            console.log(err);
            return { status: false, message: 'isp failed' }
        }
    }
}
