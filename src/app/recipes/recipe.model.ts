export class Recipe{
    public name: string;
    public desc: string;
    public imgUrl: string;

    constructor(name:string, desc:string, imgUrl:string){
        this.name = name;
        this.desc = desc;
        this.imgUrl =  imgUrl;
    }
}