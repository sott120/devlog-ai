import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { HoverInfoCard } from "./HoverCard";
import { TopicStyleType } from "@/types";

interface IStyleSelectorProps {
  value: TopicStyleType;
  onChange: (value: TopicStyleType) => void;
}

const StyleSelector = ({ value, onChange }: IStyleSelectorProps) => {
  return (
    <RadioGroup value={value} onValueChange={onChange} defaultValue="tutorial" className="flex w-fit flex-row gap-5">
      <div className="flex items-center">
        <RadioGroupItem value="tutorial" id="tutorial" />
        <Label htmlFor="tutorial" className="text-md p-2">
          튜토리얼
        </Label>
      </div>
      <div className="flex items-center">
        <RadioGroupItem value="til" id="til" />
        <Label htmlFor="til" className="text-md p-2">
          TIL
        </Label>
      </div>
      <div className="flex items-center">
        <RadioGroupItem value="troubleshooting" id="troubleshooting" />
        <Label htmlFor="troubleshooting" className="text-md p-2">
          트러블 슈팅
        </Label>
      </div>
      <div className="flex items-center">
        <HoverInfoCard />
      </div>
    </RadioGroup>
  );
};

export default StyleSelector;
