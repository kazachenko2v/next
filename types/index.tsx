export interface Post {
  creator: {
    _id: string;
    email: string;
    image: string;
    username: string;
  };
  _id: string;
  post: string;
  tag: string;
}

export interface PostCardProps {
  post: Post;
  handleEdit?: () => void;
  handleDelete?: () => void;
  handleTagClick?: (str: string) => void;
}
