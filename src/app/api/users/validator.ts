export default function validator(data: any) {
    if(data.email == null || data.email == "") {
        return {status : false, message : "name not empty"};
    }else if(data.password == null || data.password == "") {
        return {status : false, message : "password not empty"};
    }else if(data.fullname == null || data.fullname == "") {
        return {status : false, message : "fullname not empty"};
    }
    return {status : true, message : "success"};
}