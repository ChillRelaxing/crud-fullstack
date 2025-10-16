import { useState } from 'react';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import PostList from './components/PostList';
import PostForm from './components/PostForm';

function App() {
  const [activeTab, setActiveTab] = useState<'users' | 'posts'>('users');

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          🚀 CRUD Application
        </h1>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-lg border border-gray-300 bg-white p-1">
            <button
              onClick={() => setActiveTab('users')}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                activeTab === 'users'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              👥 Usuarios
            </button>
            <button
              onClick={() => setActiveTab('posts')}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                activeTab === 'posts'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              📝 Posts
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {activeTab === 'users' ? (
            <>
              <div className="lg:col-span-2">
                <UserList />
              </div>
              <div>
                <UserForm />
              </div>
            </>
          ) : (
            <>
              <div className="lg:col-span-2">
                <PostList />
              </div>
              <div>
                <PostForm />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
