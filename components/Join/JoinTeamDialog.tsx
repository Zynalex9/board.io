import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Users } from "lucide-react";

export const JoinTeamDialog = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="flex items-center gap-2 text-xs text-gray-50 font-Inter cursor-pointer w-full">
          <Users size={16} />
          Join or Create Team
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="px-2 py-4 m-0 border-0 shadow-2xl bg-[#171717]">
        <div className="px-8 py-4">
          <h1 className="font-Inter text-xl font-semibold text-white">
            Create Team
          </h1>
          <h3 className="font-Inter text-md my-6 text-white">
            Fill the details to create a new team.
          </h3>
          <div className="bg-primary-bg w-full rounded shadow-xl p-4">
            Lorem ipsum dolor sit amet.
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
