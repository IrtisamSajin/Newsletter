const express=require("express");


const bodyParser=require("body-parser");


const request=require("request");



const https=require("https");






const app=express();
app.use(express.static("Public"));  //For using static images and css file kept in Public folder
app.use(bodyParser.urlencoded({extended:true}));  //for using body-parser








app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
})








app.post("/", function(req,res){
  var FirstName=req.body.FirstName;
  var LastName=req.body.LastName;
  var email=req.body.email;

  var data={
    members:[
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: FirstName,
          LNAME: LastName
        }
      }
    ]
  }
  var jsonData=JSON.stringify(data);
  var url="https://us20.api.mailchimp.com/3.0/lists/"+"USERID"; //USERID is to be collected from Mailchimp
  const options={
    method: "Post",
    auth: "irtisam:"+"API_KEY" //API Key is to be collected from Mailchimp
  }

  const request=https.request(url,options,function(response){
    response.on("data",function(data){
      if(response.statusCode===200){
        res.sendFile(__dirname+"/success.html")
      }
      else{
        res.sendFile(__dirname+"/failure.html")
      }


      console.log(JSON.parse(data));
    })
  })
  request.write(jsonData)
  request.end()


})







app.post("/failure",function(req,res){
  res.redirect("/");
})







app.listen(process.env.PORT || 3000,function(){
  console.log("Server is running on port 3000");
})
