

exports.testServer = async(req,res,next)=>{
    try{
        res.json({
            status:true,
            message:"Hello from user microservice."
        })
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            status : false,
            message : "server error!"
        })
    }
}