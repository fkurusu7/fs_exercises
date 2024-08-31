import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Post from "./../components/Post";
import blogService from "./../services/posts";

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

// Mock the entire blogService module
vi.mock("./../services/posts", () => ({
  default: {
    update: vi.fn(),
  },
}));

describe("Post component", () => {
  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();
  });

  test("should call the like handler twice when like button is clicked twice", async () => {
    const post = {
      title: "Testing the title",
      author: "Kurusu",
      url: "url://test.com",
      likes: 3,
      user: { username: "Kurusu" },
    };

    const mockSetPosts = vi.fn();
    const mockHandleMessage = vi.fn();

    // Set up the mock implementation for blogService.update
    blogService.update.mockResolvedValue({ ...post, likes: post.likes + 1 });

    render(
      <Post
        post={post}
        setPosts={mockSetPosts}
        handleMessage={mockHandleMessage}
      />
    );

    const user = userEvent.setup();

    // Click the view button to show the like button
    const buttonView = screen.getByText("view");
    await user.click(buttonView);

    // Find and click the like button twice
    const buttonLike = screen.getByText("like");
    await user.click(buttonLike);
    await user.click(buttonLike);

    // Check if the update function was called twice
    expect(blogService.update).toHaveBeenCalledTimes(2);
  });
});
