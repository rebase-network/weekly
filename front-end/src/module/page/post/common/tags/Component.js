import React from 'react'
import _ from 'lodash'
import I18N from '@/I18N'
import styled from 'styled-components'
import { bg, primary } from '@/constants/color'
import { CVOTE_STATUS, POST_TAG_TYPE, POST_STATUS } from '@/constant'

import {Link} from 'react-router-dom'

export default ({ data }) => {
  const { tags, reference, status } = data

  let showReference = false
  let referenceId, referenceStatus
  let linkText

  if (!_.isEmpty(reference)) {

    const lastReference = _.last(reference)

    if (!_.isEmpty(lastReference) && lastReference.status !== CVOTE_STATUS.DRAFT) {
      showReference = true
      referenceId = lastReference._id
      referenceStatus = lastReference.status
      linkText = `${I18N.get('council.voting.proposal')} #${lastReference.vid}`
    }
  }

  return (
    <Container>
      {
        tags.length ? _.map(tags, (tag) => {
          const { type, _id } = tag
          return (
            type === POST_TAG_TYPE.INFO_NEEDED ? (
              <StatusBadge key={_id}>
                {I18N.get('post.btnText.needMoreInfo')}
              </StatusBadge>
            ) : (
              <StatusBadge key={_id}>
                {I18N.get('post.tag.type.UNDER_CONSIDERATION')}
              </StatusBadge>
            )
          )
        }) : ''
      }
      {
        showReference && (
          <StatusBadge>
            {`${I18N.get('post.referred')} `}
            <Link to={`/proposals/${referenceId}`}>{linkText}</Link>
            {` (${I18N.get(`cvoteStatus.${referenceStatus}`)})`}
          </StatusBadge>
        )
      }
    </Container>
  )
}


const Container = styled.div`

`

const StatusBadge = styled.div`
  display: inline-block;
  background-color: ${bg.lighterGray};
  border-radius: 0;
  padding: 2px 8px;
  white-space: nowrap;
  font-size: 13px;
  margin-right: 5px;
`
