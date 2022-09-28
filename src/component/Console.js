import React, { useContext } from "react";
import { RobotContext } from "../RobotContext";

const Console = () => {
  const { posts } = useContext(RobotContext);
  const [post] = posts;
  return (
    <div className="console" data-testid="console-container">
      {post?.map((post, i) => (
        <div key={i} data-testid="post-container">
          {post.text}
        </div>
      ))}
    </div>
  );
};

export default Console;
