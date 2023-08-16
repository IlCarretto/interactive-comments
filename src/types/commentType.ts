export interface IComment {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  user: IUser;
  replies: IComment[];
  initialScore: number;
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
  currentUser: IUser | null;
}

export interface StateSetter<T> {
  (value: T | ((prevValue: T) => T)): void;
}
