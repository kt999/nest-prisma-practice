import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { UserController,PostController } from './controllers/user.controller';
import { AppService } from './services/app.service';
import {UserService, PostService} from './services/user.service';

@Module({
  imports: [],
  controllers: [AppController,UserController,PostController],
  providers: [AppService, UserService, PostService],
})
export class AppModule {}
