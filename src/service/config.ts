import { Provide, Inject } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { Myf10 } from '../entity/myf10';
import { Context } from 'egg';



@Provide()
export class Myf10Service {
  @InjectEntityModel(Myf10)
  myf10Model: ReturnModelType<typeof Myf10>;

  @Inject()
  ctx: Context

  async saveConfig(userProject: any) {
    const {programmer_name, programmer_desc, icon_url, page_url} = userProject
    console.log(programmer_name, programmer_desc, icon_url, page_url)
    const userSetOne = await this.myf10Model.findOneAndUpdate({ programmer_name: programmer_name}, { $set: {programmer_name: programmer_name, programmer_desc: programmer_desc, icon_url: icon_url, page_url: page_url }}, {new: true, upsert: true,setDefaultsOnInsert: true}).exec();
    // return config
    console.log(userSetOne)

  }

  async findConfig(key: string) {
    const regex = new RegExp(key,"i")
    console.log(key)
    const configList = await this.myf10Model.find({ programmer_name: regex}).exec();
    console.log('configFindConfig', configList)

    return configList;
  }
  
}