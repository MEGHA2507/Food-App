import { Ingredients } from "../shared/ingredients.model";

export class Recipe{
    public name: string;
    public desc: string;
    public imgUrl: string;
    public ingredient: Ingredients[];

    constructor(name:string, desc:string, imgUrl:string, ingredient:Ingredients[]){
        this.name = name;
        this.desc = desc;
        this.imgUrl =  imgUrl;
        this.ingredient = ingredient;
    }
}