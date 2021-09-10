import Link from "next/link";
import PropTypes from "prop-types";

//Hashtag checker with regular expression
const PostCardContent = ({ postData }) => {
  const regex = /(#[^\s#]+)/g;

  return (
    <div>
      {postData.split(regex).map((v, i) => {
        if (v.match(regex)) {
          return (
            <Link key={i} href={`/hashtag/${v.slice(1)}`}>
              <a>{v}</a>
            </Link>
          );
        }
        return v;
      })}
    </div>
  );
};

PostCardContent.propTypes = {
  postData: PropTypes.string.isRequired,
};

export default PostCardContent;
