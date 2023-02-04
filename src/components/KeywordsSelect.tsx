import { BaseKeyword } from '@/types/keyword'
import CreatableSelect from '@/ui/CreatableSelect'
import genId from '@/utils/genId'
import graphqlReq from '@/utils/graphqlReq'
import { gql } from 'graphql-request'
import { FC, useMemo } from 'react'
import { Control } from 'react-hook-form'

const CREATE_KEYWORD = gql`
  mutation ($input: CreateKeywordInput!) {
    keyword: createKeyword(input: $input) {
      _id
    }
  }
`

interface KeywordsSelectProps {
  name: string
  control: Control<any>
  initialKeywords: BaseKeyword[]
  getValues: () => string[]
}

const KeywordsSelect: FC<KeywordsSelectProps> = (props) => {
  const { name, control, initialKeywords, getValues } = props

  const initialKeywordsOptions = useMemo(
    () =>
      initialKeywords.map((keyword) => ({
        label: keyword.name,
        value: keyword._id,
      })),
    [initialKeywords]
  )

  return (
    <CreatableSelect
      name={name}
      options={initialKeywordsOptions}
      control={control}
      isMulti
      onCreateOption={async ({ newOption, optionsRef, onChange }) => {
        const optionTempId = genId()

        optionsRef.current = [
          ...optionsRef.current,
          { label: newOption, value: optionTempId },
        ]

        onChange([...getValues(), optionTempId])

        const {
          keyword: { _id: keywordId },
        } = await graphqlReq(CREATE_KEYWORD, {
          input: {
            name: { en: newOption, es: '' },
          },
        })

        optionsRef.current = optionsRef.current.map((prevOption) =>
          prevOption.value === optionTempId
            ? { ...prevOption, value: keywordId }
            : prevOption
        )

        onChange(
          getValues().map((prevId) =>
            prevId === optionTempId ? keywordId : prevId
          )
        )
      }}
    />
  )
}

export default KeywordsSelect
