// TODO 리훅폼 reset
// https://react-hook-form.com/docs/useform/reset

import { getMeetDetail } from "../../actions/meetDetailAction";
import MeetEditController from "../../components/meetEdit/MeetEditController";

// meets/write

// meets/edit/1 미들웨어로 소유자 아니면 방어
interface Props {
  params: {
    meetId: string;
  };
}

const MeetEdit = async ({ params }: Props) => {
  const { meetId } = params;
  const meetWitchCamp = await getMeetDetail({ meetId });

  return <MeetEditController meetWitchCamp={meetWitchCamp} />;
};

export default MeetEdit;
