import AddIcon from '@/icons/AddIcon'
import DeleteIcon from '@/icons/DeleteIcon'
import DragIcon from '@/icons/DragIcon'
import Input from '@/ui/Input'
import { Control, useFieldArray } from 'react-hook-form'
import {
  DragDropContext,
  Droppable,
  Draggable,
  OnDragEndResponder,
} from 'react-beautiful-dnd'
import { StrictModeDroppable } from '../components/StrictModeDroppable'
import { CSSProperties, FC } from 'react'
import makeStyles from '@/utils/makeStyles'

interface TableFormProps {
  className?: string
  style?: CSSProperties
  name: string
  label: string
  control: Control<any>
}

const TableForm: FC<TableFormProps> = ({
  className,
  style,
  name,
  label,
  control,
}) => {
  const { fields, append, remove, move } = useFieldArray({
    control,
    name,
  })

  const handleDrag: OnDragEndResponder = ({ source, destination }) => {
    if (destination) {
      move(source.index, destination.index)
    }
  }

  const styles = useStyles({})

  return (
    <div className={className} style={style}>
      <label css={styles.label}>{label}</label>

      <div css={styles.form}>
        <div css={styles.formHead}>
          <span />
          <span css={styles.formHeadKey}>Name</span>
          <span css={styles.formHeadKey}>Value</span>
          <span />
        </div>

        <DragDropContext onDragEnd={handleDrag}>
          <StrictModeDroppable droppableId="1">
            {(droppableProvided) => (
              <div ref={droppableProvided.innerRef}>
                {fields.map((field, index) => (
                  <Draggable
                    draggableId={field.id}
                    key={field.id}
                    index={index}
                  >
                    {(draggableProvided) => (
                      <div
                        ref={draggableProvided.innerRef}
                        {...draggableProvided.draggableProps}
                        css={{ width: '100%' }}
                      >
                        <div css={styles.formRow}>
                          <span
                            css={styles.btnWrapper}
                            style={{ paddingLeft: '1.5rem' }}
                          >
                            <button
                              type="button"
                              css={styles.btn}
                              style={{
                                color: 'rgb(107, 114, 128)',
                                cursor: 'grab',
                              }}
                              {...draggableProvided.dragHandleProps}
                              tabIndex={-1}
                            >
                              <DragIcon />
                            </button>
                          </span>

                          <span style={{ padding: 16 }}>
                            <Input
                              css={styles.input}
                              placeholder="Spec Name"
                              name={`${name}.${index}.name.en`}
                              control={control}
                              required
                              
                            />
                          </span>

                          <span style={{ padding: 16 }}>
                            <Input
                              css={styles.input}
                              placeholder="Spec Value"
                              name={`${name}.${index}.value.en`}
                              control={control}
                              required
                            />
                          </span>

                          <span
                            css={styles.btnWrapper}
                            style={{ paddingLeft: '0.5rem' }}
                          >
                            <button
                              type="button"
                              css={styles.btn}
                              style={{
                                cursor: 'pointer',
                                color: 'rgb(185, 28, 28)',
                              }}
                              tabIndex={-1}
                              // disabled={fields.length < 2}
                              onClick={() => remove(index)}
                            >
                              <DeleteIcon />
                            </button>
                          </span>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}

                {droppableProvided.placeholder}
              </div>
            )}
          </StrictModeDroppable>
        </DragDropContext>

        <div css={styles.footer}>
          <button
            type="button"
            onClick={() =>
              append({
                name: { en: '', es: '' },
                value: { en: '', es: '' },
              })
            }
            css={styles.addBtn}
          >
            <AddIcon />
          </button>
        </div>
      </div>
    </div>
  )
}

const useStyles = makeStyles(() => ({
  label: {
    fontSize: 14,
    marginBottom: 8,
    display: 'block',
  },
  form: {
    boxShadow:
      'rgba(0, 0, 0, 0) 0 0 0 0, rgba(0, 0, 0, 0) 0 0 0 0, ' +
      'rgba(0, 0, 0, 0.1) 0 4px 6px -1px, rgba(0, 0, 0, 0.1) 0 2px 4px -2px',
    background: '#fff',
    border: '1px solid #eee',
    borderRadius: 8,
  },
  formHead: {
    gridTemplateColumns: '56px calc(40% - 56px) calc(60% - 56px) 56px',
    fontWeight: 500,
    borderBottom: '1px solid rgb(241, 245, 249)',
    alignItems: 'center',
    width: '100%',
    display: 'grid',
  },
  formHeadKey: {
    color: 'rgb(51, 65, 85)',
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
    padding: '0.5rem 1rem',
  },
  formRow: {
    gridTemplateColumns: '56px calc(40% - 56px) calc(60% - 56px) 56px',
    borderBottom: '1px solid rgb(241, 245, 249)',
    alignItems: 'center',
    width: '100%',
    display: 'grid',
    color: 'rgb(100, 116, 139)',
  },
  btnWrapper: {
    width: 24,
    height: 24,
  },
  btn: {
    background: 'transparent',
    border: 'none',
  },
  input: {
    '& input': {
      padding: '6px 12px',
    },
  },
  footer: {
    display: 'flex',
    padding: '1rem 1.25rem 1rem',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  addBtn: {
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'rgb(29, 78, 216)',
    padding: '0.25rem',
    backgroundColor: 'transparent',
    borderColor: 'rgb(59, 130, 246)',
    borderWidth: 1,
    borderRadius: '0.25rem',
    cursor: 'pointer',
  },
}))

export default TableForm
