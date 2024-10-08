export const createPrompt = (selectedOptions: {
  [key: string]: boolean;
}): string => {
  const selectedKeys = Object.entries(selectedOptions)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .filter(([key, value]) => value)
    .map(([key]) => key)
    .join(', ');
  //todo 같은 옵션 전달 시 응답 계속 동일한 것 수정 필요
  return `User has selected the following options: ${selectedKeys}. He/She wants to get recommendation from you based on these options. 
      You should provide books which exist in the real world. You must not make fake books.
      Give me information about following (based on options): 
      1. Book Category ('소설', '시/에세이', '인문학', '과학', '역사', '경제', '종교', '예술', '기타')
      2. Book Length ('lower than 100pages', '100~300 pages', 'more than 300pages')
      3. Book Type ('국내도서', '외국도서')
      4. Book Title
      5. Book Author
      6. Book Description (Within 150~200words)
      And please give answer in Korean.`;
};

const systemMessage = {
  role: 'system',
  content: `Give one recommendation based on the user's selected options. The options include: 
  1. BookCategory ('소설', '시/에세이', '인문학', '과학', '역사', '경제', '종교', '예술', '기타')
  2. BookLength ('lower than 100pages', '100~300 pages', 'more than 300pages', with exact number of pages)
  3. BookType ('국내도서', '외국도서')
  4. BookTitle
  5. BookAuthor
  6. BookDescription (Within 150~200words, but please finish with full sentences.)
  Don't give answer as markdown form, give it as JSON format, which keys are 6 items above.
  Please respond in Korean. But keys should be in English.
  Also, if user wants to another recommendation with same previous options, you should give another recommendation, not same answer as previous one.
  `,
};

export const getPrompt = (pressedButtons: {[key: string]: boolean}) => {
  const userMessage = createPrompt(pressedButtons);
  return [
    systemMessage,
    {
      role: 'user',
      content: userMessage,
    },
  ];
};
