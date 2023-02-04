import { FC, HTMLAttributes, useRef } from 'react'
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

  return (
    <div {...divProps}>
      {label && <label css={styles.label}>{label}</label>}

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
                'preview',
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
            }}
          />
        )}
      />
    </div>
  )
}

const useStyles = makeStyles(({}: EditorProps) => ({
  label: {
    fontSize: 14,
    marginBottom: 8,
    display: 'block'
  },
}))

export default Editor
