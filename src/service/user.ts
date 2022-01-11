import { Provide, Inject } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { User } from '../entity/user';
import { Context } from 'egg';



@Provide()
export class UserService {
  @InjectEntityModel(User)
  userModel: ReturnModelType<typeof User>;

  @Inject()
  ctx: Context

  async getTest() {
    console.log('this.userModel', this.userModel, this.ctx)
    const {"user-agent":ua} = this.ctx.header
    const user = await this.userModel.findOne({name: 'shenwei'}).exec();

    let isFromStf = ua.includes('mobile') || ua.includes('hexin')
    let userTask = isFromStf ? ['stf'] : []
    if(!user) {
      const { _id: id } = await this.userModel.create({ name: 'shenwei', tasks: userTask } as User);
      const userSetOne = await this.userModel.findById(id).exec();
      console.log(userSetOne)
    }else if(isFromStf) {
      let updataTask = []
      if(user.tasks.includes('stf')) {
        updataTask = user.tasks
      }else {
        console.log('no include')
        updataTask = user.tasks.concat('stf')
      }
      console.log('updataTask',updataTask)
      const userSetOne = await this.userModel.findOneAndUpdate({ name: 'shenwei'}, { $set: {tasks: updataTask}}, {new: true}).exec();
      console.log('hasUser', userSetOne, userSetOne.tasks)
      return userSetOne
    }

  }


  async login(username: string, ip: string) {
    console.log('this.userModel', this.userModel, this.ctx)
    let {"user-agent":ua} = this.ctx.header
    const user = await this.userModel.findOne({name: username}).exec();
    ua = ua.toLocaleLowerCase()
    let isFromStf = ua.includes('mobile') || ua.includes('hexin')
    let userTask = isFromStf ? ['stf'] : []


    
    if(!user) {
      const { _id: id } = await this.userModel.create({ name: username, tasks: userTask } as User);
      const userSetOne = await this.userModel.findById(id).exec();
      return userSetOne
    }else if(isFromStf) {
      let updataTask = []
      if(user.tasks.includes('stf')) {
        updataTask = user.tasks
      }else {
        console.log('no include')
        updataTask = user.tasks.concat('stf')
      }
      const userSetOne = await this.userModel.findOneAndUpdate({ name: username}, { $set: {tasks: updataTask}}, {new: true}).exec();
      console.log(userSetOne)
      return userSetOne
    }

    return user

  }

  async checkTaskStatus(name: string, tasks: string[]) {

    const user = await this.userModel.findOne({name}).exec();
    const currentTasks = user.tasks;

    const finishedTask = [];
    const unfinishedTask = [];
    let done = true;

    tasks.forEach((task: string) => {
      if(currentTasks.includes(task)) {
        finishedTask.push(task)
      }else {
        done = false
        unfinishedTask.push(task)
      }
    })

    return {
      finishedTask,
      unfinishedTask,
      done
    }

  }
  
}