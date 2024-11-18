// TODO 리훅폼 reset
// https://react-hook-form.com/docs/useform/reset

import { redirect } from "next/navigation";
import { getMeetDetail } from "../../actions/meetDetailAction";
import MeetCreatorForm from "../../components/meetsWrite/MeetCreatorForm";

// meets/write

// meets/edit/1 미들웨어로 소유자 아니면 방어
interface Props {
  params: {
    meetId: string;
  };
}

const MeetEdit = async ({ params }: Props) => {
  const { meetId } = params;
  const meetWithCamp = await getMeetDetail({ meetId });
  if (!meetWithCamp) {
    redirect("/");
  }

  return <MeetCreatorForm meetId={meetId} meetWithCamp={meetWithCamp} />;
};

export default MeetEdit;
