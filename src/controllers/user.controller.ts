import { Controller, Get, Post,Put, Param, Body } from '@nestjs/common';
import {UserService,PostService} from '../services/user.service';
import {postUserDto, updateUserDto} from '../dtos/user.dto';

@Controller("user")
export class UserController {
  constructor(private readonly appService: UserService) {}

  @Get()
  async getUserList() {

    const userList =  await this.appService.getUserList();

    const result = {
      "result" : userList,
      "isSuccess" : true,
      "message" : "유저 리스트 조회 성공"
    };

    return result;
  }

  @Get(':userIdx')
  async getUserDetail(@Param('userIdx') userIdx : number) {

    const userDetail = await this.appService.getUserDetail(userIdx);

    const result = {
      "result" : userDetail,
      "isSuccess" : true,
      "message" : "유저 상세 조회 성공"
    };

    return result;
  }

  @Post()
  async postUser(@Body() bodyData : postUserDto) {

    const userAdd = await this.appService.postUser(bodyData);

    const result = {
      "isSuccess" : true,
      "message" : userAdd
    };

    return result;
  }

  @Put(':userIdx')
  async updateUser(@Param('userIdx') userIdx : number , @Body() bodyData : updateUserDto) {
    const userUpdate = await this.appService.updateUser(userIdx, bodyData);

    const result = {
      "isSuccess" : true,
      "message" : userUpdate
    };

    return result;
  }
}

@Controller("post")
export class PostController {
  constructor(private readonly appService: PostService) {}

  @Post(':userIdx')
  async postUserPost(@Param('userIdx') userIdx : number ,@Body() bodyData : postUserDto) {

    const userPostAdd = await this.appService.postUserPost(userIdx,bodyData);

    const result = {
      "isSuccess" : true,
      "message" : userPostAdd
    };

    return result;
  }
}