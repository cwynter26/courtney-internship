import { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";

const Author = () => {
  const { authorId } = useParams();
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!authorId) {
      setLoading(false);
      return;
    }
    let active = true;

    async function fetchAuthor() {
      setLoading(true);
      setError("");
      try {
        const response = await fetch("https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems");
        if (!response.ok) {
          throw new Error("Failed to fetch author details");
        }
        const data = await response.json();
        
        const selectedAuthor = data.find((item) => String(item.authorId) === String(authorId));
        
        if (!selectedAuthor) {
          throw new Error("Author not found");
        }
        if (active) {
          setAuthor(selectedAuthor);
        }
      } catch (error) {
        if (active) {
          setError(error.message);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    fetchAuthor();

    return () => {
      active = false;
    };
  }, [authorId]);

  if (loading) return <div className="container mt-5">Loading author...</div>;
  if (error) return <div className="container mt-5">{error}</div>;
  if (!authorId) {
    return (
      <div className="container mt-5">
        <h2>Select an author to view their profile</h2>
      </div>
    );
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img src={author?.authorImage || AuthorImage} alt="" />

                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          Creator #{authorId}
                          <span className="profile_username">Creator ID {authorId}</span>
                          <span id="wallet" className="profile_wallet">
                            wallet: {author?.walletAddress || "N/A"}
                          </span>
                          <button id="btn_copy" title="Copy Text">
                            Copy
                          </button>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">573 followers</div>
                      <Link to="#" className="btn-main">
                        Follow
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems authorId={authorId} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
