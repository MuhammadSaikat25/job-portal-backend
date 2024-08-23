export interface TUser{
    name:{
        firstName:string,
        lastName:string
    },
    role:"admin"|"candidate"|'employee',
    email:string,
    password:string,
    avatar:string
}