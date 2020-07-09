import { Injectable } from '@nestjs/common';

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

@Injectable()
export class AppService {

  async getUserList() {

    const userList = await prisma.user.findMany(
      {
        include: { posts: true },
      }
    );

    prisma.disconnect();

    return userList;
  }

  async getUserDetail(userIdx : number) {

    //요거 너무 비효율 적인디
    userIdx = Number(userIdx);

    const userDetail = await prisma.user.findMany(
      {
        where : {id : userIdx},
        include: { posts: true },
      }
    );

    prisma.disconnect();

    return userDetail;
  }

  async postUser(bodyData){

    const postResult = await prisma.user.create({
      data: bodyData
    });

    console.log(postResult);

    return "유저 정보 추가 성공.";
  }

  async updateUser(userIdx : number, bodyData){

    userIdx = Number(userIdx);

    const updateResult = await prisma.user.update({
      where: { id: userIdx },
      data: bodyData
    });

    console.log(updateResult);

    return "유저 정보 수정 성공.";
  }
}
