import { Input } from "@/components/ui/input";

interface IKeywordInputProps {
  value: string;
  onChange: (value: string) => void;
  errorMessage: string;
  helperMessage: string;
}

const KeywordInput = ({ value, onChange, errorMessage, helperMessage }: IKeywordInputProps) => {
  return (
    <div className="w-full max-w-2xl">
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type="text"
        placeholder="키워드를 입력하세요(, 구분)"
        className={`h-12 w-full border-none bg-white/45 text-base outline-none ${errorMessage ? "ring-1 ring-red-400" : ""}`}
      />
      <p className={`mt-1 min-h-5 text-xs ${errorMessage ? "text-red-600" : "text-muted-foreground"}`}>
        {errorMessage || helperMessage}
      </p>
    </div>
  );
};

export default KeywordInput;
