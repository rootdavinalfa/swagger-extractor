const {
    default: Axios
} = require("axios");
const fs = require('fs');

let token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyb290ZGF2aW5hbGZhIiwiaWF0IjoxNjA2MzY5MTcxLCJleHAiOjg4MDA2MzY5MTcxfQ._fdcRwlMf5XTPZrisULDXK9yq-B76uOr0Za2pj9dHxaT228n89YPnnlWCihMg4qPSmwu220GonV8RVvzlfM-yA'

fs.readFile('extracted-url.json', (err, data) => {
    if (err) throw err;
    let endpoint = JSON.parse(data);
    let datas = [];
    endpoint.forEach(ep => {
        let url = ep.url.split('/')
        let path = 0
        let pathstr = null
        for (var i = 0; i < url.length; i++) {
            if (i > 4) {
                if(i == 5){
                    pathstr = ''
                }
                path += 1;
                pathstr += url[i]
                if(i < url.length - 1){
                    pathstr += "/"
                }
            }
        }
        let create = "X";
        let read = "X";
        let update = "X";
        let deletee = "X";

        switch (ep.method) {
            case 'get':
                read = "R";
                break;
            case 'post':
                create = "C";
                break;
            case 'put':
                update = "U";
                break;
            case 'delete':
                deletee = "D";
                break;
        }

        datas.push({
            "accesscreate": create,
            "accessdelete": deletee,
            "accessread": read,
            "accessupdate": update,
            "base": url[3] + '/' + url[4],
            "method": ep.method,
            "path": path,
            "pathstr" : pathstr,
        })
    });

    Axios.request({
        url: 'http://127.0.0.1:8080/api/v1/sc/listendpoint/batch',
        headers: {
            'Authorization': 'Bearer ' + token
        },
        method: 'POST',
        data: datas
    }).then(thn => {
        console.log(thn.status)
    }).catch(e => {
        console.log(e.message)
    })

    /*
    for (let i = 0; i < datas.length; i++) {
        let data = datas[i];
        
        Axios.request({
            url: 'http://127.0.0.1:8080/api/v1/sc/listendpoint',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            method: 'POST',
            data: data
        }).then(thn => {
            console.log(thn.status)
            console.log(thn.data);
        }).catch(e => {
            console.log(e.message)
        })
    }*/
})