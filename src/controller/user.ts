import { Inject, Controller, Provide, Query, Get, Post, Body } from '@midwayjs/decorator';
import { UserService } from '../service/user';
import { Context } from 'egg';

@Provide()
@Controller('/api/user')
export class UserController {
  @Inject()
  userService: UserService;

  @Inject()
  ctx: Context

  @Get('/')
  async getUser(@Query() id: string) {
    const {host, "user-agent":ua} = this.ctx.header
    console.log('result==============',host,ua)

    // const user = await this.userService.getTest();
    return 'result';
  }

  @Post('/login')
  async login(@Body() username: string,@Body() ip: string) {
    // const {username, ip} = this.ctx.request.body;
    // console.log('=============', username, ip)
    const user = await this.userService.login(username, ip)
    return {
      code: 20000,
      data: user,
      token: 'admin-token'
    }
  }

  @Get('/taskdone')
  async taskDone(@Query() username: string,@Query() task: string) {
    if(!username || !task) {
      return {
        code: 20000,
        message: 'param error'
      }
    }
    const target = task.split(',')
    const taskStatus = await this.userService.checkTaskStatus(username, target)
    return {
      code:  20000,
      data: taskStatus
    }
  }

  @Post('/testquery')         
  async testquery() {
    console.log(this.ctx.query)
  }


}
