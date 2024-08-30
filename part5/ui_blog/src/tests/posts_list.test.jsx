import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Post from "./../components/Post";

test("should check a post renders the title and author, but do not render its url or likes fields", async () => {
  const post = {
    title: "Testing the title",
    author: "Kurusu",
    url: "url://test.com",
    likes: 3,
  };

  const { container } = render(
    <Post
      post={post}
      setPosts={() => console.log()}
      handleMessage={() => console.log()}
    />
  );
  const titleElement = container.querySelector(".title");
  expect(titleElement).toHaveTextContent("Testing the title by Kurusu");

  const urlElement = screen.queryByText("url://test.com");
  expect(urlElement).toBeNull();

  // Check that element with 'likes' class is not present
  const likesElement = container.querySelector(".likes");
  expect(likesElement).toBeNull();
});
