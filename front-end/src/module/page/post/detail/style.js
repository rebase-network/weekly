import styled from 'styled-components'
import { Button, Row, Anchor } from 'antd'
import { breakPoint } from '@/constants/breakPoint'
import { text, bg, primary, border } from '@/constants/color'
import { gap } from '@/constants/variable'

export const Container = styled.div`
`

export const Detail = styled.div`
  width: 500px;
  padding: 20px;
`

export const Title = styled.div`
  font-size: 30px;
  color: ${text.newGray};
  margin-bottom: 8px;
 `

export const BtnGroup = styled.div`
  margin-left: 20px;
`

export const StyledButton = styled(Button)`
  margin-right: 20px;
`
