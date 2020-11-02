'use strict';
const { default: Axios } = require('axios');
const fs = require('fs');
const nm = require("./newModel")
Axios.get('http://127.0.0.1:8080/v2/api-docs?group=Referensi%20API')
.then(response =>{
    let api = response.data;
    
    //Read file
    let paths = api.paths;
    let pathKey = Object.keys(paths);

    let extracted = [];
    pathKey.forEach(key => {
        let pth = paths[key]
        let url = key;
        let methods = Object.keys(pth)
        methods.forEach(mthd => {
            let deta = pth[mthd]
            var a = new nm.newModel(url,mthd,deta.tags[0],deta.summary,deta.operationId)
            extracted.push(a.getJSON())
        });
    })

    fs.writeFile('extracted-url.json',JSON.stringify(extracted,undefined,4),(err)=>{
        if(err){
            throw err;
        }

        console.log("Please type npm run update to insert to the API");
    })
}).catch(e =>{
    console.log(e)
});
