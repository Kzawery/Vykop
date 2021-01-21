import {Content} from './content';
import {User} from './user';

export class Post {
  id: number;
  author: User;
  votes: number;
  title: string;
  content: Content;
  creationDate: Date;
  comments: Set<Comment>;
}
