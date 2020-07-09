import { Controller, Get, Post,Put, Param, Body } from '@nestjs/common';
import { AppService } from './app.service';
import {postUserDto, updateUserDto} from './app.dto';

@Controller("app")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('user')
  async getUserList() {

    const userList =  await this.appService.getUserList();

    const result = {
      "result" : userList,
      "isSuccess" : true,
      "message" : "유저 리스트 조회 성공"
    };

    return result;
  }

  @Get('user/:userIdx')
  async getUserDetail(@Param('userIdx') userIdx : number) {

    const userDetail = await this.appService.getUserDetail(userIdx);

    const result = {
      "result" : userDetail[0],
      "isSuccess" : true,
      "message" : "유저 상세 조회 성공"
    };

    return result;
  }

  @Post('user')
  async postUser(@Body() bodyData : postUserDto) {

    const userAdd = await this.appService.postUser(bodyData);

    const result = {
      "isSuccess" : true,
      "message" : userAdd
    };

    return result;
  }

  @Put('user/:userIdx')
  async updateUser(@Param('userIdx') userIdx : number , @Body() bodyData : updateUserDto) {
    const userUpdate = await this.appService.updateUser(userIdx, bodyData);

    const result = {
      "isSuccess" : true,
      "message" : userUpdate
    };

    return result;
  }
}
