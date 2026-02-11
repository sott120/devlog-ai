import { IoMdClose } from "react-icons/io";

const KeywordTag = () => {
  return (
    <div className="flex h-12 w-full max-w-2xl flex-row flex-wrap gap-2">
      <p className="flex shrink-0 flex-row items-center gap-1">
        <span>너뭐냐여ㅛ?</span>
        <IoMdClose />
      </p>
      <input
        name="keyword"
        type="text"
        placeholder="키워드를 입력하세요"
        maxLength={20}
        className="text-base focus:outline-none active:outline-none"
      />
    </div>
  );
};

export default KeywordTag;
