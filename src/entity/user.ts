import { prop } from '@typegoose/typegoose';
import { EntityModel } from '@midwayjs/typegoose'



@EntityModel()
export class User {
  @prop()
  public name?: string;

  @prop()
  public ip?: string;

  @prop( {type: ()=> [String]})
  public tasks?: string[]
}