"use client";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { CoachingExpert } from "@/services/Option";
import { UserButton } from "@stackframe/stack";
import { useQuery } from "convex/react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function DiscussionRoom() {
  const { roomid } = useParams();
  const DiscussionRoomData = useQuery(api.DiscussionsRoom.getDiscussionRoom, {
    id: roomid,
  });
  const [expert, setExpert] = useState();
  useEffect(() => {
    if (DiscussionRoomData) {
      const Expert = CoachingExpert.find(
        (item) => item.name === DiscussionRoomData.expertName
      );
      console.log(Expert);
      setExpert(Expert);
    }
  });

  return (
    <div className="-mt-12">
      <h2 className="text-lg font-bold">
        {DiscussionRoomData?.coachingOption}
      </h2>
      <div className="mt-5 grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <div className=" h-[60vh] bg-secondary  border rounded-4xl flex flex-col items-center justify-center relative">
            <Image
              src={expert?.avatar}
              alt="Avatar"
              width={200}
              height={200}
              className="h-[80px] w-[80px] rounded-full object-cover animate-pulse"
            />
            <h2 className="text-gray-500">{expert?.name}</h2>
            <div className="p-5 bg-gray-200 px-10 rounded-lg absolute bottom-10 right-10">
              <UserButton />
            </div>
          </div>
          <div className="mt-5 flex items-center justify-center">
            <Button>Connect</Button>
          </div>
        </div>
        <div>
          <div className="h-[60vh] bg-secondary  border rounded-4xl flex flex-col items-center justify-center relative">
            <h2>Chart section</h2>
          </div>
          <h2 className="mt-4 text-gray-400 text-sm">
            At the end of your conversation we will automatically generate a
            feedback/notes from your conversation
          </h2>
        </div>
      </div>
    </div>
  );
}

export default DiscussionRoom;
