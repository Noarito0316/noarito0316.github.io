import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import YouTube from '@tiptap/extension-youtube'

export default function TiptapEditor({ content, onChange, editorRef }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link,
      YouTube.configure({
        width: 640,
        height: 360,
        HTMLAttributes: {
          class: 'youtube-video',
        },
      }),
    ],
    content: content || '',
    onUpdate({ editor }) {
      const html = editor.getHTML()
      onChange(html)
    },
  })

  if (editor && editorRef) {
    editorRef.current = editor
  }

  return (
    <div style={{ border: '1px solid #ccc', borderRadius: 4, padding: 12 }}>
      <EditorContent editor={editor} />
    </div>
  )
}
