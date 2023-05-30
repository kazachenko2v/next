import { Post } from "@/types";
import PostCard from "./PostCard";

const Profile = ({
  name,
  desc,
  data,
  handleEdit,
  handleDelete,
}: {
  name: string | null;
  desc: string;
  data: Post[] | null;
  handleEdit?: (id: string) => void;
  handleDelete?: (id: string) => void;
}) => {
  return (
    <section className="w-full">
      <h1 className="mt-5 text-5xl font-extrabold leading-[1.15] text-black sm:text-6xl text-left">
        <span>{name && name} Profile</span>
      </h1>
      <p className="mt-5 text-lg text-gray-600 sm:text-xl max-w-2xl text-left">
        {desc}
      </p>

      <div className="mt-10 space-y-6 py-8 sm:columns-2 sm:gap-6 xl:columns-3">
        {data &&
          data.map((post) => (
            <PostCard
              key={post._id}
              post={post}
              handleEdit={() => handleEdit && handleEdit(post._id)}
              handleDelete={() => handleDelete && handleDelete(post._id)}
            />
          ))}
      </div>
    </section>
  );
};

export default Profile;
