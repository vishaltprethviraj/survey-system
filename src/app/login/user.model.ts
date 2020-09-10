export class User {
    constructor(
        public message:string,
        public _token:string,
        public refreshtoken:string,
        public roleid:string,
        public username:string,
        public email:string,
        public _tokenExpirationDate:Date,
        public _id:string
    ){}

    get token() {
        if(!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
            return null;
        }
        
        return this._token;
    }
}