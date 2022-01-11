import { prop } from '@typegoose/typegoose';
import { EntityModel } from '@midwayjs/typegoose'



@EntityModel()
export class Myf10 {
  @prop()
  public programmer_name?: string;

  @prop()
  public programmer_desc?: string;

  @prop()
  public icon_url?: string;

  @prop()
  public page_url?: string;
}