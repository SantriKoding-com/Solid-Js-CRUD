import { Route } from "@solidjs/router";

//import views home
import Home from "../pages/home";

//import views posts
import PostIndex from "../pages/posts/index";
import PostCreate from "../pages/posts/create";
import PostEdit from "../pages/posts/edit";

export default function Routes() {
  return (
    <>
      <Route path="/" component={Home} />
      <Route path="/posts" component={PostIndex} />
      <Route path="/posts/create" component={PostCreate} />
      <Route path="/posts/edit/:id" component={PostEdit} />
    </>
  );
}