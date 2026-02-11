import { Input } from "@/components/ui/input";

interface IKeywordInputProps {
  value: string;
  onChange: (value: string) => void;
}

const KeywordInput = ({ value, onChange }: IKeywordInputProps) => {
  return (
    <Input
      required
      minLength={1}
      maxLength={20}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      type="text"
      placeholder="키워드를 입력하세요(, 구분)"
      className="h-12 w-full max-w-2xl border-none bg-white/45 text-base outline-none"
    />
  );
};

export default KeywordInput;
