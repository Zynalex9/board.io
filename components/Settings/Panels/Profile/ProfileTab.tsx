import { ChangePassword } from "./ChangePassword";
import { ImageRight } from "./ImageRight";
import { ProfileInput } from "./ProfileInput";

export const ProfileTab = () => {
  return (
    <div className="h-96 px-1">
      <h1 className="font-Inter text-2xl">Profile</h1>
      <div className="flex justify-between w-full">
        <div className="my-4 w-[65%] overflow-y-auto h-96  px-4">
          <div className="w-[80%]">
            <ProfileInput />
            <ChangePassword />
          </div>
          <div className="w-full bg-primary-bg my-6 border-red-500 border-1 px-4 py-2 space-y-6 rounded-xl">
            <h2 className="mt-5 text-red-500">Danger Zone</h2>
            <p className="text-sm">
              Proceed with caution, once completed, these actions cannot be
              undone.
            </p>
            <button className="mb-5 silver-border px-2 py-1.5 bg-black text-white cursor-pointer hover:bg-black/50">
              Delete Team
            </button>
          </div>
        </div>
        <ImageRight />
      </div>
    </div>
  );
};
