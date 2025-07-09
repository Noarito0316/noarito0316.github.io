import { useEffect, useRef, useState } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import supabase from '../utils/DB_client'
import ImageLibraryModal from './ImageLibraryModal'


const categorias = ['promocoes', 'vagas', 'noticias', 'sorteios']

export default function PostEditor() {
  const editorRef = useRef(null)
  const [title, setTitle] = useState('')
  const [categoria, setCategoria] = useState(categorias[0])
  const [loading, setLoading] = useState(false)
  const [posts, setPosts] = useState([])
  const [showLibrary, setShowLibrary] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [content, setContent] = useState('')

  useEffect(() => {
    async function fetchPosts() {
      const { data, error } = await supabase
        .from('posts')
        .select('id, title, category')
        .order('id', { ascending: false })

      if (error) {
        console.error('Erro ao carregar posts:', error)
      } else {
        setPosts(data)
      }
    }
    fetchPosts()
  }, [])

  async function handleDelete(postId) {
    const confirmado = window.confirm('Tem certeza que deseja apagar este post?')
    if (!confirmado) return

    const { error } = await supabase.from('posts').delete().eq('id', postId)

    if (error) {
      alert('Erro ao deletar post: ' + error.message)
    } else {
      alert('Post apagado com sucesso!')
      setPosts(prev => prev.filter(p => p.id !== postId))
    }
  }

  async function handleSubmit() {
    if (!title || !content) return
    setLoading(true)

    const { data, error } = await supabase.from('posts').insert({
      title,
      category: categoria,
      content,
    }).select()

    if (error) {
      alert('Erro ao salvar post: ' + error.message)
    } else {
      alert('Post publicado com sucesso!')
      setTitle('')
      setContent('')
      setPosts(prev => [data[0], ...prev])
      if (editorRef.current) editorRef.current.setContent('')
    }

    setLoading(false)
  }

  function handleInsertImage(url) {
    if (editorRef.current) {
      editorRef.current.insertContent(`<img src="${url}" alt="imagem" />`)
    }
    setShowLibrary(false)
  }

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 16 }}>
      <h2>Criar Postagem</h2>

      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={e => setTitle(e.target.value)}
        style={{ width: '100%', marginBottom: 12, padding: 8 }}
      />

      <select
        value={categoria}
        onChange={e => setCategoria(e.target.value)}
        style={{ padding: 8, marginBottom: 12 }}
      >
        {categorias.map(c => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      <Editor
        apiKey="wv9j99ifeltryyfl37qfz8yzvhtjpefdwnca5l80rhzq8nrz"
        onInit={(evt, editor) => (editorRef.current = editor)}
        value={content}
        onEditorChange={(newContent) => setContent(newContent)}
        init={{
          height: 500,
          menubar: true,
          language: 'pt_BR',
          plugins: [
            'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link', 'lists',
            'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
            'checklist', 'mediaembed', 'casechange', 'formatpainter', 'pageembed',
            'a11ychecker', 'tinymcespellchecker', 'permanentpen', 'powerpaste',
            'advtable', 'advcode', 'editimage', 'advtemplate', 'ai', 'mentions',
            'tinycomments', 'tableofcontents', 'footnotes', 'mergetags',
            'autocorrect', 'typography', 'inlinecss', 'markdown', 'importword',
            'exportword', 'exportpdf',
          ],
          toolbar:
            'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | ' +
            'link image media table mergetags | addcomment showcomments | ' +
            'spellcheckdialog a11ycheck typography | align lineheight | ' +
            'checklist numlist bullist indent outdent | emoticons charmap | removeformat',
          tinycomments_mode: 'embedded',
          tinycomments_author: 'Author name',
          mergetags_list: [
            { value: 'First.Name', title: 'First Name' },
            { value: 'Email', title: 'Email' },
          ],
          ai_request: (request, respondWith) =>
            respondWith.string(() =>
              Promise.reject('Veja a documentação para ativar o assistente de IA')
            ),
          content_style: 'body { font-family:Arial,sans-serif; font-size:14px }',
        }}
      />


      <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
        <button onClick={handleSubmit} disabled={loading}>
          {loading ? 'Publicando...' : 'Publicar'}
        </button>
        <button onClick={() => setShowLibrary(true)}>📷 Inserir imagem da biblioteca</button>
        <button onClick={() => setShowPreview(prev => !prev)}>
          {showPreview ? 'Ocultar prévia' : '🔍 Ver prévia'}
        </button>
      </div>

      {showLibrary && (
        <ImageLibraryModal
          onSelect={handleInsertImage}
          onClose={() => setShowLibrary(false)}
        />
      )}

      {showPreview && (
        <div style={{ marginTop: 20, border: '1px solid #ccc', padding: 16, borderRadius: 4 }}>
          <h3>Pré-visualização</h3>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      )}

      <hr style={{ margin: '40px 0' }} />

      <h2>Postagens Recentes</h2>
      {posts.length === 0 && <p>Nenhuma postagem ainda.</p>}

      {posts.map(post => (
        <div key={post.id} style={{ border: '1px solid #ccc', borderRadius: 4, padding: 12, marginBottom: 12 }}>
          <h3>{post.title}</h3>
          <p><strong>Categoria:</strong> {post.category}</p>
          <button onClick={() => handleDelete(post.id)} style={{ color: 'red' }}>
            Apagar
          </button>
        </div>
      ))}
    </div>
  )
}
