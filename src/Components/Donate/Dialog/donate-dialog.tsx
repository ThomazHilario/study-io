// Components
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogPortal,
} from "@/Components/commons";

// Interface
import { IconPropsComponent } from "@/interfaces/icon-type";

// Components
import { Donate } from "../donate";

// Lucide React
import { HandHeart } from "lucide-react";
import { cn } from "@/utils";

export const DonateDialog = (propsIcon: IconPropsComponent) => {
  // TailwindCss
  const backgroundColor = "bg-gray-400/10";

  return (
    <Dialog>
      <DialogTrigger
        role="donate_dialog_trigger"
        className={cn(
          "flex flex-col items-center justify-center py-[0.15rem] px-[0.35rem] rounded-md",
          `data-[state="open"]:${backgroundColor}`,
          `hover:${backgroundColor}`,
        )}
      >
        {/* Icon */}
        <HandHeart {...propsIcon} />

        {/* Name */}
        <p className="text-white text-[0.8rem] font-semibold font-system">
          Donate
        </p>
      </DialogTrigger>

      <DialogPortal>
        <DialogContent
          role="donate_content_trigger"
          className="absolute top-1/2 left-[52%] -translate-x-1/2 -translate-y-[45%]"
        >
          <Donate />
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};
