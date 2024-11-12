import { ProfileSelect } from "@/_components/chat/types/Profile.types";
import { CampSelect } from "../../meets/types/camp.types";

// export interface FeedItem {
//   id: number;
//   like: number;
//   title: string;
//   desc: string;
//   img: string;
//   firstImageUrl?: string;
//   profileImg: string;
//   userName: string;
//   date: string;
//   time?: number;
//   camp:CampSelect[];
// }
export type FeedItem = {
  at: string;
  campId: number;
  content: string;
  id: string;
  likes: number | null;
  rating: number;
  title: string;
  updated: string | null;
  userId: string;
  camp: CampSelect | null;
  profile: ProfileSelect | null;
};
