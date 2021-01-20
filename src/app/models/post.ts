import {Content} from './content';
import {User} from './user';

export class Post {
  id: number;
  author: User;
  votes: number;
  content: Content;
  creationDate: Date;
  comments: Set<Comment>;
}
