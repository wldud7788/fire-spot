// join 등 복잡한 쿼리는 rpc로 작성
const supabaseRpc = {
  meet: {
    getMeetDetail: "get_meet_detail"
  }
};

export default supabaseRpc;
