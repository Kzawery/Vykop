import {User} from './user';

export class Comment {
    id: number;
    text: string;
    votes: number;
    author: User;
    upvoted: boolean;
}
