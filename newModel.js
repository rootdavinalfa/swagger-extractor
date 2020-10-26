exports.newModel = function(url,method,tags,description,operation){
    url = url;
    method = method;
    description = description;
    operation = operation;
    tags = tags;

    this.getUrl=function(){
        return url;
    }

    this.getMethod=function(){
        return method;
    }

    this.getDesc = function(){
        return description;
    }

    this.getOperation = function(){
        return operation;
    }

    this.getTags = function(){
        return tags;
    }

    this.getJSON = function(){
        return {
            "url" : url,
            "method" : method,
            "tags" : tags,
            "description" : description,
            "operation" : operation
        };
    }
}