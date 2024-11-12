export interface ReviewItem {
  id: number;
  like: number;
  title: string;
  desc: string;
  img: string;
  firstImageUrl?: string;
  profileImg: string;
  userName: string;
  date: string;
  time?: number;
}
