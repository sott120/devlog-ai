import { Input } from "@/components/ui/input";

interface ITopicInputProps {
  value: string;
  onChange: (value: string) => void;
}

const TopicInput = ({ value, onChange }: ITopicInputProps) => {
  return (
    <Input
      required
      minLength={1}
      maxLength={200}
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="포스팅 주제를 입력하세요"
      className="h-12 w-full max-w-2xl border-none bg-white/45 text-base outline-none"
    />
  );
};

export default TopicInput;
