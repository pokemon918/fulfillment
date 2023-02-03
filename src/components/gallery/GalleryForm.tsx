import { Control, useFieldArray } from 'react-hook-form'
import isVideoUrl from '@/utils/isVideoUrl'
import DeleteIcon from '@/icons/DeleteIcon'
import {
  DragDropContext,
  Draggable,
  OnDragEndResponder,
} from 'react-beautiful-dnd'
import DragIcon from '@/icons/DragIcon'
import AssetUpload from '@/components/AssetUpload'
import { StrictModeDroppable } from '../StrictModeDroppable'
import { CSSProperties, FC } from 'react'
import makeStyles from '@/utils/makeStyles'

interface GalleryFormProps {
  className?: string
  style?: CSSProperties
  control: Control<any>
  name: string
  label?: string
  onDelete?: (filename: string) => void
}

const GalleryForm: FC<GalleryFormProps> = ({
  className,
  style,
  control,
  name,
  label,
  onDelete,
}) => {
  const { fields, append, remove, move } = useFieldArray({
    control: control as Control<{ [k: string]: { src: string }[] }, any>,
    name,
  })

  const handleDrag: OnDragEndResponder = ({ source, destination }) => {
    if (destination) {
      move(source.index, destination.index)
    }
  }

  const styles = useStyles({})

  return (
    <div style={style} className={className}>
      {label && <h6 css={styles.label}>{label}</h6>}

      <DragDropContext onDragEnd={handleDrag}>
        <StrictModeDroppable droppableId="1" direction="horizontal">
          {(droppableProvided) => (
            <div
              css={styles.gallery}
              className="bg-white shadow"
              ref={droppableProvided.innerRef}
            >
              {fields.map((field, index) => {
                const isVideo = isVideoUrl(field.src)

                return (
                  <Draggable
                    key={field.id}
                    draggableId={field.id}
                    index={index}
                  >
                    {(draggableProvided) => (
                      <div
                        css={styles.assetWrapper}
                        ref={draggableProvided.innerRef}
                        {...draggableProvided.draggableProps}
                      >
                        <div css={styles.asset}>
                          {isVideo ? (
                            <video css={styles.assetItem} controls>
                              <source src={field.src} />
                            </video>
                          ) : (
                            <img
                              css={styles.assetItem}
                              src={field.src}
                              alt=""
                            />
                          )}

                          <button
                            type="button"
                            css={styles.dragBtn}
                            {...draggableProvided.dragHandleProps}
                          >
                            <DragIcon />
                          </button>

                          <button
                            type="button"
                            css={styles.deleteBtn}
                            tabIndex={-1}
                            onClick={() => {
                              const filename = fields[index].src
                                .split('/')
                                .slice(-1)[0]
                              remove(index)
                              if (onDelete) onDelete(filename)
                            }}
                          >
                            <DeleteIcon />
                          </button>
                        </div>
                      </div>
                    )}
                  </Draggable>
                )
              })}

              {droppableProvided.placeholder}

              <AssetUpload
                onUploaded={(assets) =>
                  assets.forEach((assetUrl) => append({ src: assetUrl }))
                }
              />
            </div>
          )}
        </StrictModeDroppable>
      </DragDropContext>
    </div>
  )
}

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
  },
  label: {
    fontSize: 14,
    fontWeight: 400,
    marginBottom: 8,
  },
  gallery: {
    display: 'flex',
    flexDirection: 'row',
    overflowX: 'auto',
    width: '100%',
    padding: 16,
    border: '2px solid #cacaca',
    borderRadius: 4,
  },
  assetWrapper: {
    flexShrink: 0,
    paddingRight: 16,
  },
  assetItem: {
    height: '100%',
    width: 'auto',
    borderRadius: '0.25rem',
    overflow: 'hidden',
    border: '1px solid #64748b',
  },
  asset: {
    position: 'relative',
    height: 200,
  },
  deleteBtn: {
    position: 'absolute',
    top: 48,
    left: 6,
    color: 'rgb(185, 28, 28)',
    padding: '0.25rem',
    backgroundColor: 'rgb(244, 244, 245)',
    borderRadius: '0.25rem',
    cursor: 'pointer',
    display: 'inline-flex',
    border: 'none',
  },
  dragBtn: {
    position: 'absolute',
    top: 6,
    left: 6,
    display: 'inline-flex',
    color: 'rgb(107, 114, 128)',
    padding: '0.25rem',
    borderRadius: '0.25rem',
    cursor: 'grab',
    backgroundColor: 'rgb(244, 244, 245)',
    border: 'none',
  },
}))
export default GalleryForm
