interface Hashtag {
  type: string;
}

interface Meta {
  views: number;
  rating: number;
}

export interface IVideo {
  ownerId: string;
  title: string;
  description: string;
  createdAt: Date;
  hashtags: Hashtag[];
  meta: Meta;
  __v: number;
  _id: string;
}
