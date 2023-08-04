export interface IComment {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  user: IUser;
  replies: IComment[] | null;
}

export interface IUser {
  image: {
    png: string;
    webp: string;
  };
  username: string;
}

export interface State {
  comments: IComment[];
  currentUser: IUser;
}