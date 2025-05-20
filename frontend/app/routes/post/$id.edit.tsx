import { createFileRoute, useLoaderData, useNavigate } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { BlogPost } from './$id'
import MDEditor from '@uiw/react-md-editor'

export const Route = createFileRoute('/post/$id/edit')({
  component: RouteComponent,
})

function RouteComponent() {
  const post = useLoaderData({ from: "/post/$id" }) as BlogPost
  const navigate = useNavigate()
  const [content, setContent] = useState(post.content)
  const [title, setTitle] = useState(post.title)

  // Initialize form with post data when it loads
  useEffect(() => {
    if (post) {
      setContent(post.content)
      setTitle(post.title)
    }
  }, [post])


  const handleSave = () => {
    console.log('Saving updated post')
    // In the future, this would send the update to an API
    navigate({ to: '/post/$id', params: { id: post._id } })
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
      </dialog>
    </div>
  )
}
