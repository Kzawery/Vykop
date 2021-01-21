import {Content} from './content';
import {User} from './user';
import {Comment} from './comment';

export class Post {
  id: number;
  author: User;
  votes: number;
  title: string;
  content: Content;
  creationDate: Date;
  comments: Set<Comment>;
}
