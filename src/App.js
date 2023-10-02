import './App.css';
import Counter from './features/counter/Counter';
import PostsList from './features/posts/PostList';
import AddPostForm from './features/posts/AddPostForm';

function App() {
  return (
    <div className="App">
      <Counter />
      <PostsList />
      <AddPostForm />
    </div>
  );
}

export default App;
