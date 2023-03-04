import { PostInfo } from '../post/types';

export interface MyPostAPI {
  success: boolean;
  message: string;
  data: {
    myPosts: PostInfo[];
  };
}
