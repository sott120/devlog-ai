import { Input } from "@/components/ui/input";

interface ITopicInputProps {
  value: string;
  onChange: (value: string) => void;
  errorMessage: string;
  helperMessage: string;
}

const TopicInput = ({ value, onChange, errorMessage, helperMessage }: ITopicInputProps) => {
  return (
    <div className="w-full max-w-2xl">
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="포스팅 주제를 입력하세요"
        className={`h-12 w-full border-none bg-white/45 text-base outline-none ${errorMessage ? "ring-1 ring-red-400" : ""}`}
      />
      <p className={`mt-1 min-h-5 text-xs ${errorMessage ? "text-red-600" : "text-muted-foreground"}`}>
        {errorMessage || helperMessage}
      </p>
    </div>
  );
};

export default TopicInput;
