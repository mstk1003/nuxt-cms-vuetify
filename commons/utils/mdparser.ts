// TODO markdownのパーサーを作成する
// TODO md→title(#:h1)取得
// 章立て(##:h2)取得
// TODO md→ボディ（mdファイルそのまま）

export class MdParser {
  getHeading = (index: number, str: string) => {
    const reg = new RegExp(`(^|\\n)#{${index}}\\s.*(\\n|$)`, 'g');
    return str.match(reg);
  };
}
