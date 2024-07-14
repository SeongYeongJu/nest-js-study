import { Injectable, NotFoundException } from '@nestjs/common';

export interface PostModel {
  id: number;
  author: string;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
}

let posts: PostModel[] = [
  {
    id: 1,
    author: 'newjeans_official',
    title: '뉴진스 민지',
    content: '공연중인 민지',
    likeCount: 121212,
    commentCount: 999999999,
  },
  {
    id: 2,
    author: 'newjeans_official',
    title: '뉴진스 해린',
    content: '밥먹는 해린',
    likeCount: 121212,
    commentCount: 999999999,
  },
  {
    id: 3,
    author: 'blackpink_official',
    title: '블랙핑크 로제',
    content: '쇼핑하는 로제',
    likeCount: 121212,
    commentCount: 999999999,
  },
];

@Injectable()
export class PostsService {
  getAllPosts(): PostModel[] {
    return posts;
  }

  getPostById(id: number): PostModel {
    const post = posts.find((post) => post.id === id);

    if (!post) {
      // NotFoundException은 Nest.js가 기본적으로 제공.
      // 이를 이용하여, 해당 경로를 찾지 못했음을 알리는 에러 객체를 생성한 후, 클라이언트에 전송할 수 있다.
      //   {
      //     "message": "Not Found",
      //     "statusCode": 404
      // }
      throw new NotFoundException();
    }
    return post;
  }

  createPost(author: string, title: string, content: string) {
    const post: PostModel = {
      id: posts[posts.length - 1].id + 1,
      author,
      title,
      content,
      likeCount: 0,
      commentCount: 0,
    };

    posts = [...posts, post];

    return post;
  }

  updatePost(id: number, author: string, title: string, content: string) {
    const post = posts.find((post) => post.id === Number(id));

    if (!post) {
      throw new NotFoundException();
    }

    if (author) post.author = author;
    if (title) post.title = title;
    if (content) post.content = content;

    posts.map((prevPost) => (prevPost.id === Number(id) ? post : prevPost));

    return post;
  }

  deletePostById(id: number) {
    const post = posts.find((post) => post.id === Number(id));

    if (!post) {
      throw new NotFoundException();
    }

    posts = posts.filter((post) => post.id !== Number(id));

    return id;
  }
}
