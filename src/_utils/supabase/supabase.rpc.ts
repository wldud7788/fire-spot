// join 등 복잡한 쿼리는 rpc로 작성
const supabaseRpc = {
  meet: {
    getMeetDetail: "get_meet_detail",
    getMeetList: "get_meet_list"
  },
  meetAttendee: {
    getMeetAttendeeWithMeetAndCamp: "get_meet_attendee_with_meet_and_camp"
  }
} as const;

export default supabaseRpc;
