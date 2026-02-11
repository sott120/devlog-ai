import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { FaQuestionCircle } from "react-icons/fa";

export const HoverInfoCard = () => {
  return (
    <HoverCard openDelay={10} closeDelay={100}>
      <HoverCardTrigger asChild>
        <FaQuestionCircle />
      </HoverCardTrigger>
      <HoverCardContent className="flex w-72 flex-col gap-2">
        <div>
          <div className="font-semibold">튜토리얼 </div>
          <div className="text-muted-foreground">새로운 기술을 배울 때 사용하는 블로그 포스팅 스타일</div>
          <div className="text-muted-foreground mt-1 text-xs">예시: React useState 훅 사용법</div>
        </div>
        <div>
          <div className="font-semibold">TIL </div>
          <div className="text-muted-foreground">오늘 배운 내용을 기록하는 블로그 포스팅 스타일</div>
          <div className="text-muted-foreground mt-1 text-xs">예시: CSR과 SSR의 차이점은?</div>
        </div>
        <div>
          <div className="font-semibold">트러블 슈팅 </div>
          <div className="text-muted-foreground">문제 발생과 해결 과정을 기록하는 블로그 포스팅 스타일</div>
          <div className="text-muted-foreground mt-1 text-xs">예시: 비동기 처리 중 오류 발생 시 해결 방법</div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};
