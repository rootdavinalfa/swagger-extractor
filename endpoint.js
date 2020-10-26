const { default: Axios } = require("axios");
const fs = require('fs');

let token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyb290ZGF2aW5hbGZhIiwiaWF0IjoxNjAzMzMyNTUwLCJleHAiOjE2MDM0MTg5NTB9.nPNFy8O6L5kqkhHsM8yb88TNZYZI6_KWP1qkW6J24EajM_5P2Z2SsjWoHIpRNJNmtUsavK3yCwdI4nkot26V2g'

fs.readFile('extracted-url.json',(err,data)=>{
    if(err) throw err;
    let endpoint = JSON.parse(data);
    endpoint.forEach(ep => {
        let url = ep.url.split('/')
        let path = "";
        for(var i = 0;i<url.length;i++){
            if(i > 4){
                path.concat("/").concat(url[i])
            }
        }
        
        if(path == ""){
            path = "*";
        }
    
        Axios.request(
            {
                url :'http://127.0.0.1:8080/api/v1/sc/listenpoint',
                headers : {'Authorization' : 'Bearer '+token},
                method : 'POST',
                data : 
                    {
                        "access": "CRUD",
                        "base": url[3]+'/'+url[4],
                        "id": 0,
                        "method": ep.method,
                        "path": path,
                      }
                
        }).then(thn =>{
            console.log(thn.status)
            console.log(thn.data);
        }).catch(e =>{
            console.log(e.message)
        })
        sleep(500)
    });
})

async function sleep(millis) {
    return new Promise(resolve => setTimeout(resolve, millis));
}
