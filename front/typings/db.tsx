export interface IUser {
  id: number;
  email: string;
  nickname: string;
  posts?: IPost[];
  comments?: IComment[];
  liked?: IPost[]; // 'Like' 관계를 통해 연결된 Post
  followings?: Partial<IUser>[]; // 'Follow' 관계를 통해 연결된 팔로잉들
  followers?: Partial<IUser>[]; // 'Follow' 관계를 통해 연결된 팔로워들
  postUser?: IReport; // 'Report' 관계, 포스팅한 사용자
  reportUser?: IReport; // 'Report' 관계, 리포트한 사용자
}

export interface IPost {
  id: number;
  content: string;
  createdAt?: Date;
  appeal?: string;
  lockStatus?: boolean;
  author?: IUser;
  comments?: IComment[];
  images?: IImage[];
  likers?: Partial<IUser>[];
  retweet?: IPost;
  reports?: IReport[];
}

export interface IImage {
  id: number;
  src: string;
  postId: number;
}

export interface IComment {
  id: number;
  content: string;
  createdAt: Date;
  post: IPost;
  user: IUser;
}

export interface IHashtage {
  id: number;
  name: string;
  posts: IPost[];
}

export interface IReport {
  id: number;
  reason: string;
  postUser: IUser;
  reportUser: IUser;
  posts: IPost[];
  createdAt: Date;
}
