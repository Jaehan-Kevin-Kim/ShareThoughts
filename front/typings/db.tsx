export interface IUser {
  id: number;
  email: string;
  nickname: string;
  Posts?: IPost[];
  Comments?: IComment[];
  Liked?: IPost[]; // 'Like' 관계를 통해 연결된 Post
  Followings?: Partial<IUser>[]; // 'Follow' 관계를 통해 연결된 팔로잉들
  Followers?: Partial<IUser>[]; // 'Follow' 관계를 통해 연결된 팔로워들
  PostUser?: IReport; // 'Report' 관계, 포스팅한 사용자
  ReportUser?: IReport; // 'Report' 관계, 리포트한 사용자
}

export interface IPost {
  id: number;
  content: string;
  createdAt?: Date;
  appeal?: string;
  lockStatus?: boolean;
  User?: IUser;
  Comments?: IComment[];
  Images?: IImage[];
  Likers?: Partial<IUser>[];
  Retweet?: IPost;
  Reports?: IReport[];
}

export interface IImage {
  id: number;
  src: string;
  PostId: number;
}

export interface IComment {
  id: number;
  content: string;
  createdAt: Date;
  Post: IPost;
  User: IUser;
}

export interface IHashtage {
  id: number;
  name: string;
  Posts: IPost[];
}

export interface IReport {
  id: number;
  reason: string;
  PostUser: IUser;
  ReportUser: IUser;
  Posts: IPost[];
  createdAt: Date;
}