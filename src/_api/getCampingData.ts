const CAMPING_KEY = process.env.NEXT_PUBLIC_GOCAMPING_KEY;
const CAMP_URL = "http://apis.data.go.kr/B551011/GoCamping/basedList";

export const getTotalData = async () => {
  try {
    const res = await fetch(
      `${CAMP_URL}?serviceKey=${CAMPING_KEY}&numOfRows=4040&pageNo=1&MobileOS=ETC&MobileApp=TestApp&_type=json`
    );

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    const allData = data.response.body.items.item;
    console.log(allData);
    return allData;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
