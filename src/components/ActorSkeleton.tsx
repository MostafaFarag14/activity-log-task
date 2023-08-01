import React from "react";

export function TextSkeleton() {
  return <div className="animate-pulse h-5 w-48 bg-gray-200" />;
}

function ActorSkeleton() {
  return (
    <div className="flex items-center">
      <div className="animate-pulse mr-2 h-10 w-10  rounded-full overflow-hidden relative bg-gray-200" />
      <TextSkeleton />
    </div>
  );
}

export default ActorSkeleton;
