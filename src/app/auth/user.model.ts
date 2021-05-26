export class User{
    constructor(public email:string, public id: string, private _token: string, private tokenexpireDate: Date){}

    get token(){
        if(!this.tokenexpireDate || new Date() > this.tokenexpireDate){
            return null;
        }
        return this._token;
    }
}