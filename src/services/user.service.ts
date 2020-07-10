import { Injectable } from '@nestjs/common';

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

@Injectable()
export class UserService {

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

    const userDetail = await prisma.user.findOne(
      {
        where : {id : userIdx},
        include: { posts: true },
      }
    );

    prisma.disconnect();

    return userDetail;
  }

  async postUser(bodyData) : Promise<string>{

    const postResult = await prisma.user.create({
      data: bodyData
    });

    console.log(postResult);

    return "유저 정보 추가 성공.";
  }

  async updateUser(userIdx : number, bodyData) : Promise<string>{

    userIdx = Number(userIdx);

    const updateResult = await prisma.user.update({
      where: { id: userIdx },
      data: bodyData
    });

    console.log(updateResult);

    return "유저 정보 수정 성공.";
  }
}

@Injectable()
export class PostService {

  async postUserPost(userIdx : number, bodyData) : Promise<string>{

    userIdx = Number(userIdx);

    const postResult = await prisma.post.create({
      data: {
        title : bodyData.title,
        content : bodyData.content,
        author: {
          connect: { id: userIdx },
        }
      }
    });

    console.log(postResult);

    return "유저 게시글 등록 성공.";
  }

}