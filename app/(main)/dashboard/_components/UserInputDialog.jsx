import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { CoachingExpert } from "@/services/Option";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@radix-ui/react-dialog";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

function UserInputDialog({ children, ExpertsList }) {
  const [SelectedExperts, setSelectedExperts] = useState();
  const [topic, setTopic] = useState();
  const createDiscussionRoom = useMutation(api.DiscussionsRoom.createNewRoom);

  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const OnClickNext = async () => {
    setLoading(true);
    const result = await createDiscussionRoom({
      coachingOption: ExpertsList.name,
      topic: topic,
      expertName: SelectedExperts,
    });
    setLoading(false);
    console.log(result);
    setOpenDialog(false);
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{ExpertsList.name}</DialogTitle>
          <DialogDescription asChild>
            <div className="mt-3">
              <h2 className="text-black ">
                Enter a topic to master your skills in {ExpertsList.name}
              </h2>
              <Textarea
                placeholder="Enter your topic here..."
                className="mt-2"
                onChange={(e) => setTopic(e.target.value)}
              ></Textarea>

              <h2 className="text-black mt-5">Select a coaching expert</h2>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-6 mt-3">
                {CoachingExpert.map((expert, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => setSelectedExperts(expert.name)}
                    >
                      <Image
                        src={expert.avatar}
                        alt={expert.name}
                        width={100}
                        height={100}
                        className={`rounded-2xl h-[80px] w-[80] object-cover
                        hover:scale-105 transition-all cursor-pointer
                        ${SelectedExperts == expert.name && "border-3 border-primary"}
                        `}
                      />
                      <h2 className="text-center">{expert.name}</h2>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-end gap-5 mt-5">
                <DialogClose asChild>
                  <Button variant={"ghost"}>Cancel</Button>
                </DialogClose>
                <Button
                  disabled={!topic || !SelectedExperts || loading}
                  onClick={OnClickNext}
                >
                  {loading && "Creating..."}
                  Next
                </Button>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default UserInputDialog;
