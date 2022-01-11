import { Inject, Controller, Provide, Get, Post, Query } from '@midwayjs/decorator';
import { Context } from 'egg';
import { Myf10Service } from './../service/config';

@Provide()
@Controller('/fronted/config')
export class ConfigController {
  @Inject()
  myf10Service: Myf10Service;
 
  @Inject()
  ctx: Context

  @Get('/')
  async getConfig(@Query() key: string) {
    const configList = await this.myf10Service.findConfig(key)
    let res: any = {
      status_code: 10001,
      status_msg: 'result empty',
      data:[]
    }
    if(configList && configList.length > 0 ) {
      res = {
        status_code: 0,
        status_msg: '',
        data: configList
      }
    }
    console.log(res)
    return res;
  }

  @Post('/local')         
  async testpost() {
    console.log('enter post',this.ctx.request.body)

    const userProject = this.ctx.request.body;
    const saveResult = this.myf10Service.saveConfig(userProject)
    console.log(saveResult)
    const res = {
      status_code: 0,
      status_msg: 'success'
    }
    return res;
  }

  
}
