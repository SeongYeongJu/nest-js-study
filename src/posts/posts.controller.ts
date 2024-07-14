import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PostsService } from './posts.service';

// Controller는 클라이언트에서 받은 요청에 따라 적재적소의 알맞은 함수(service)로 라우팅하는 역할을 한다.

// controller 데코레이터와 http 메서드(@Get, @Post 등) 이름의 데코레이터의 인수로 path를 넣을 수 있다.
// 해당 path는 controller 클래스 하위 메서드들의 path의 prefix가 될 수 있다.
// 예) controller 데코레이터에 "post"를 넣고 Get 데코레이터에는 경로를 넣지 않은 경우, /post 경로에서 데이터를 가져올 수 있다.
// 예) controller 데코레이터에 "post"를 넣고 Get 데코레이터에는 "1"을 넣은 경우, /post/1 경로에서 데이터를 가져올 수 있다.
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getPosts() {
    return this.postsService.getAllPosts();
  }

  // posts/:id 경로로 요청이 들어올 경우, GET 데코레이터 인수로 아래와 같이 적어주면 된다.
  @Get(':id')
  // getPost 함수에 파라미터로 /posts/:id 경로에서 id를 가져올 수 있다.
  // 이를 위해서 Param 데코레이터를 사용해야 한다.
  // 보통은 param으로 들어오는 값은 타입이 string이다.
  // 그리고 해당 파라미터를 id라고 이름 지어주기 위해서는 Param 데코레이터 인수로 'id'를 넣어 명시할 수 있다.
  getPost(@Param('id') id: string) {
    return this.postsService.getPostById(Number(id));
  }

  @Post()
  postPosts(
    @Body('author') author: string,
    @Body('title') title: string,
    @Body('content') content: string,
  ) {
    return this.postsService.createPost(author, title, content);
  }

  @Patch(':id')
  patchPost(
    @Param('id') id: string,
    @Body('author') author?: string,
    @Body('title') title?: string,
    @Body('content') content?: string,
  ) {
    return this.postsService.updatePost(Number(id), author, title, content);
  }

  @Delete(':id')
  deletePost(@Param('id') id: string) {
    return this.postsService.deletePostById(Number(id));
  }
}
