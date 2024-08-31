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

test("should show url and likes fields when the view button is clicked", async () => {
  const post = {
    title: "Testing the title",
    author: "Kurusu",
    url: "url://test.com",
    likes: 3,
    user: { username: "Kurusu" },
  };

  const { container } = render(
    <Post
      post={post}
      setPosts={() => console.log()}
      handleMessage={() => console.log()}
    />
  );

  const user = userEvent.setup();
  const button = screen.getByText("view");

  // Check URL and Likes are not visible initially
  expect(screen.queryByText("url://test.com")).not.toBeInTheDocument();
  expect(screen.queryByText("Likes: 3")).not.toBeInTheDocument();

  // Check URL and Likes are are now visible
  await user.click(button);
  expect(screen.queryByText("url://test.com")).toBeDefined();
  expect(container.querySelector(".likes")).toBeDefined();
});
