import { FC, HTMLAttributes, useRef, useState } from 'react'
import { Editor as TinyEditor } from '@tinymce/tinymce-react'
import { Editor as EditorRefT } from 'tinymce'
import { Control, Controller } from 'react-hook-form'
import makeStyles from '@/utils/makeStyles'

interface EditorProps extends HTMLAttributes<HTMLDivElement> {
  name: string
  control: Control<any>
  label?: string
  placeholder: string
}

const Editor: FC<EditorProps> = (props) => {
  const editorRef = useRef<EditorRefT>()

  const styles = useStyles(props)

  const { name, label, control, placeholder, ...divProps } = props

  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <div {...divProps}>
      {label && <label css={styles.label}>{label}</label>}

      <div css={styles.editorWrapper}>
        <div style={{ visibility: isLoaded ? undefined : 'hidden' }}>
          <Controller
            name={name}
            control={control}
            render={({ field: { value, onChange } }) => (
              <TinyEditor
                apiKey="88t9ob1nrbza2aeszg9wzsc8tq5r07vqhotqw6aqownedn88"
                value={value}
                onEditorChange={(editorContent) => onChange(editorContent)}
                init={{
                  placeholder,
                  removed_menuitems: 'newdocument print fontfamily',
                  plugins: [
                    'advlist',
                    'autolink',
                    'lists',
                    'link',
                    'image',
                    'media',
                    'charmap',
                    'anchor',
                    'searchreplace',
                    'visualblocks',
                    'fullscreen',
                    'insertdatetime',
                    'table',
                    'help',
                    'wordcount',
                    'emoticons',
                  ],
                  content_style: 'img { max-width: 100%; }',
                  toolbar:
                    'fullscreen visualblocks | blocks fontsize container | image | imageupload' +
                    'bold italic strikethrough underline forecolor backcolor | ' +
                    'alignleft aligncenter alignright alignjustify lineheight | ' +
                    'blockquote bullist numlist indent outdent | ' +
                    'subscript superscript | ' +
                    'removeformat',
                  toolbar_mode: 'scrolling',
                  setup(editor) {},
                }}
                onInit={(evt, editor) => {
                  editorRef.current = editor
                  setIsLoaded(true)
                }}
              />
            )}
          />
        </div>

        {!isLoaded && <div css={styles.loadingWrapper}>Loading...</div>}
      </div>
    </div>
  )
}

const useStyles = makeStyles(({}: EditorProps) => ({
  label: {
    fontSize: 14,
    marginBottom: 8,
    display: 'block',
  },
  editorWrapper: {
    position: 'relative',
    width: '100%',
    minHeight: '400px',
  },
  loadingWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
}))

export default Editor
