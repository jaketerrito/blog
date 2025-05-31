import { createFileRoute, useLoaderData, useNavigate, useRouter } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { BlogPost } from './$id'
import MDEditor from '@uiw/react-md-editor'
import { createServerFn } from '@tanstack/react-start'
import { apiRequest } from '@/modules/api'

export const Route = createFileRoute('/post/$id/edit')({
  component: RouteComponent,
})

const updatePost = createServerFn({ method: "POST" })
  .validator((data: { id: string, title: string, content: string, isPublic: boolean }) => data)
  .handler(async ({ data: { id, title, content, isPublic } }) => {
    return apiRequest<BlogPost>(`/blog-post/${id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'user-id': 'jake',
      },
      body: JSON.stringify({ title: title, content: content, public: isPublic }),
    });
});

function RouteComponent() {
  const post = useLoaderData({ from: "/post/$id" }) as BlogPost
  const router = useRouter()
  const navigate = useNavigate()
  const [content, setContent] = useState(post.content)
  const [title, setTitle] = useState(post.title)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isPublic, setIsPublic] = useState(post.public)

  // Initialize form with post data when it loads
  useEffect(() => {
    if (post) {
      setContent(post.content)
      setTitle(post.title)
      setIsPublic(post.public)
    }
  }, [post])


  const handleSave = async () => {
    try {
      setErrorMessage(null)
      await updatePost({ data: { id: post._id, title, content, isPublic } })
      
      // Invalidate all routes to ensure post data is refreshed everywhere
      // This includes the post list in the root route and the individual post route
      await router.invalidate()
      
      navigate({ to: '/post/$id', params: { id: post._id } })
    } catch (error) {
      setErrorMessage(
        'An unexpected error occurred while saving the post'
      )
    }
  }

  const handleCancel = () => {
    navigate({ to: '/post/$id', params: { id: post._id } })
  }

  const modalStyles = {
    overlay: {
      position: 'fixed' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    }
  }

  return (
    <div style={modalStyles.overlay}>
      <dialog open>
        <h2>Edit Post</h2>
        <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
        />
        <MDEditor
          value={content}
          onChange={(value) => setContent(value || '')}
        />
        <label>
          <input
            type="checkbox"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
          />
          Make post public
        </label>
        <button 
          onClick={handleCancel} 
        >
          Cancel
        </button>
        <button 
          onClick={handleSave} 
        >
          Save
        </button>
        {errorMessage && <p>{errorMessage}</p>}
      </dialog>
    </div>
  )
}
