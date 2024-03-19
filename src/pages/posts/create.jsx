//import createSignal
import { createSignal } from "solid-js";

//import from @solidjs/router
import { useNavigate } from "@solidjs/router";

//import API
import api from "../../services/api";

export default function PostCreate() {
  //init navigate
  const navigate = useNavigate();

  //define state
  const [image, setImage] = createSignal("");
  const [title, setTitle] = createSignal("");
  const [content, setContent] = createSignal("");

  //state validation
  const [errors, setErrors] = createSignal([]);

  //method handle file change
  const handleFileChange = (e) => {
    setImage(e.currentTarget.files[0]);
  };

  //method store post
  const storePost = async (e) => {
    e.preventDefault();

    //init FormData
    const formData = new FormData();

    //append data
    formData.append("image", image());
    formData.append("title", title());
    formData.append("content", content());

    //send data with API
    await api
      .post("/api/posts", formData)
      .then(() => {
        //redirect to posts index
        return navigate("/posts", { replace: true });
      })
      .catch((error) => {
        //set errors response to state "errors"
        setErrors(error.response.data);
      });
  };

  return (
    <div className="row mt-5">
      <div className="col-md-12">
        <div className="card border-0 rounded shadow">
          <div className="card-body">
            <form onSubmit={storePost}>
              <div className="mb-3">
                <label className="form-label fw-bold">Image</label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="form-control"
                />
                {errors().image && (
                  <div className="alert alert-danger mt-2">
                    {errors().image[0]}
                  </div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Title</label>
                <input
                  type="text"
                  className="form-control"
                  value={title()}
                  onChange={(e) => setTitle(e.currentTarget.value)}
                  placeholder="Title Post"
                />
                {errors().title && (
                  <div className="alert alert-danger mt-2">
                    {errors().title[0]}
                  </div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Content</label>
                <textarea
                  className="form-control"
                  value={content()}
                  onChange={(e) => setContent(e.currentTarget.value)}
                  rows="5"
                  placeholder="Content Post"
                ></textarea>
                {errors().content && (
                  <div className="alert alert-danger mt-2">
                    {errors().content[0]}
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="btn btn-md btn-primary rounded-sm shadow border-0"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

