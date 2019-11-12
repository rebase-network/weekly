import styled from 'styled-components'
import { breakPoint } from '@/constants/breakPoint'

export const Container = styled.div`
  margin: 30px;
  @media only screen and (max-width: ${breakPoint.mobile}) {
    width: 100%;
    padding: 16px;
    margin: 0;
  }
`
