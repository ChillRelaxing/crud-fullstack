import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { postApi } from '../services/api';
import { Post } from '../types';
import PostForm from './PostForm';

function PostList() {
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const queryClient = useQueryClient();

  const { data: posts, isLoading, error } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const response = await postApi.getAll();
      return response.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: postApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  const handleDelete = (id: number) => {
    if (window.confirm('¿Estás seguro de eliminar este post?')) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">Cargando posts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
        Error al cargar posts. Asegúrate de que el servidor esté corriendo.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {editingPost && (
        <PostForm
          editingPost={editingPost}
          onCancelEdit={() => setEditingPost(null)}
        />
      )}
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-blue-500 text-white">
          <h2 className="text-2xl font-bold">📝 Lista de Posts</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {posts && posts.length > 0 ? (
            posts.map((post) => (
              <div
                key={post.id}
                className="p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {post.title}
                      </h3>
                      {post.published ? (
                        <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">
                          ✓ Publicado
                        </span>
                      ) : (
                        <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                          ⏸ Borrador
                        </span>
                      )}
                    </div>
                    {post.content && (
                      <p className="text-gray-600 mb-2 line-clamp-2">
                        {post.content}
                      </p>
                    )}
                    <p className="text-sm text-gray-500">
                      👤 Autor: {post.author?.name}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Creado: {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingPost(post)}
                      className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
                    >
                      ✏️ Editar
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      disabled={deleteMutation.isPending}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-gray-400 transition-colors"
                    >
                      🗑️ Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-gray-500">
              No hay posts registrados. ¡Crea el primero!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PostList;
