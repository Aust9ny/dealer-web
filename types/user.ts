export interface User{
    id : number
    Fname : string
    Lname : string 
    tel : string
    role : string
    email : string
    password : string
    cart? : object[]
    profileImg? : string
    DealerID? : number
}