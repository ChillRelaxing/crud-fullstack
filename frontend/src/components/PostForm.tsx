import { useState, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { postApi, userApi } from '../services/api';
import { Post, CreatePostDto } from '../types';

interface PostFormProps {
  editingPost?: Post | null;
  onCancelEdit?: () => void;
}

function PostForm({ editingPost, onCancelEdit }: PostFormProps) {
  const [formData, setFormData] = useState<CreatePostDto>({
    title: editingPost?.title || '',
    content: editingPost?.content || '',
    published: editingPost?.published || false,
    authorId: editingPost?.authorId || 0,
  });

  const queryClient = useQueryClient();

  const { data: users } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await userApi.getAll();
      return response.data;
    },
  });

  useEffect(() => {
    if (editingPost) {
      setFormData({
        title: editingPost.title,
        content: editingPost.content || '',
        published: editingPost.published,
        authorId: editingPost.authorId,
      });
    }
  }, [editingPost]);

  const createMutation = useMutation({
    mutationFn: postApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      setFormData({ title: '', content: '', published: false, authorId: 0 });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<CreatePostDto> }) =>
      postApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      if (onCancelEdit) onCancelEdit();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPost) {
      const { authorId, ...updateData } = formData;
      updateMutation.mutate({ id: editingPost.id, data: updateData });
    } else {
      createMutation.mutate(formData);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        {editingPost ? '✏️ Editar Post' : '➕ Nuevo Post'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Título
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Contenido
          </label>
          <textarea
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
            rows={4}
          />
        </div>
        {!editingPost && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Autor
            </label>
            <select
              value={formData.authorId}
              onChange={(e) =>
                setFormData({ ...formData, authorId: Number(e.target.value) })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value={0}>Selecciona un autor</option>
              {users?.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="published"
            checked={formData.published}
            onChange={(e) =>
              setFormData({ ...formData, published: e.target.checked })
            }
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label
            htmlFor="published"
            className="ml-2 text-sm font-medium text-gray-700"
          >
            Publicado
          </label>
        </div>
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={createMutation.isPending || updateMutation.isPending}
            className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-gray-400 transition-colors"
          >
            {createMutation.isPending || updateMutation.isPending
              ? 'Guardando...'
              : editingPost
              ? 'Actualizar'
              : 'Crear'}
          </button>
          {editingPost && (
            <button
              type="button"
              onClick={onCancelEdit}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default PostForm;
