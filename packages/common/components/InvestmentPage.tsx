import { useState } from 'react'
import { useUser } from '../hooks'
import { AddIcon, CheckIcon, MoreBtnIcon } from '../icons'
import { theme } from '../theme'
import { BaseCategory, BaseProduct } from '../types'
import { Button, Container, PageBgColor } from '../ui'
import { makeStyles } from '../utils'
import { Category } from './Category'
import ContractItem from './ContractItem'
import { Footer } from './Footer'
import { Navbar } from './Navbar'
import { ProductVertical } from './ProductVertical'
import {useRouter} from "next/router"

interface InvestmentPageProps {
  categorys: BaseCategory[]
}

export function InvestmentPage(props: InvestmentPageProps) {
  const { categorys } = props

  const user = useUser()
const router = useRouter();
  const styles = useStyles(props);
  const [showStep, setShowStep] = useState(1);

  return (
    <>
      <PageBgColor bgColor="#f8f8f8" />

      <div css={styles.root}>
        <Navbar css={styles.navbar} />

        <div css={styles.body}>
          <div style={{ height: 48 }} />

          <Container maxWidth="md">
            <div css={{display: 'grid',
gridTemplateColumns: '1fr 1fr',
gap: '20px',alignItems:'center',marginBottom:'30px'}}>
                <h2 css={{fontSize:'32px',color:"#101010",fontWeight:'600'}}>{showStep === 1 ? 'Investment Opportunities' : showStep === 2 ? "Active Investments" : "Completed Investments"}</h2>
                <div css={{display: 'flex',
justifyContent: 'space-between',
alignItems: 'center',
gap: '10px'}}>


                    <button onClick={() => setShowStep(1)} css={{cursor:'pointer',background: 'transparent',
                    border:0,
borderBottom: showStep === 1 ? '1px solid #3BA83B' : '0',
color: '#3BA83B',
fontSize: '14px',
fontWeight: '500',
paddingBottom: '5px'}}>Investment Opportunities</button>


                    <button onClick={() => setShowStep(2)} css={{cursor:'pointer',background: 'transparent',
                     border:0,
borderBottom: showStep === 2 ? '1px solid #3BA83B' : '0',
color: '#3BA83B',
fontSize: '14px',
fontWeight: '500',
paddingBottom: '5px'}}>My Active Investments</button>


                    <button onClick={() => setShowStep(3)} css={{cursor:'pointer',background: 'transparent',
                     border:0,
borderBottom: showStep === 3 ? '1px solid #3BA83B' : '0',
color: '#3BA83B',
fontSize: '14px',
fontWeight: '500',
paddingBottom: '5px'}}>My Completed Investments</button>
                </div>
            </div>
            <div>
                <p css={{fontSize:'15px',fontWeight:'400',color:"#101010",marginBottom:'100px'}}>View your funded contracts which are currently in progress to be executed</p>


               {showStep === 1 ? (
                <ContractItem showBottomBorder={true} showButton={true} showPrograss={false} prograss={30} onClick={() => router.push('/all-investment/250')} showDuration={true} showinvestNowBtn={true} />
               ) : showStep === 2 ? (
                <>
                <ContractItem showBottomBorder={true} showButton={true} showPrograss={true} prograss={100}  onClick={() => router.push({pathname:'/all-investment/250',query:{type:'prograss'}})} showDuration={true} />
                <ContractItem showBottomBorder={false} showButton={true} showPrograss={true} prograss={100}  onClick={() => router.push({pathname:'/all-investment/250',query:{type:'prograss'}})} showDuration={true} />
                </>
               ) : showStep === 3 ? (
              <>
                <ContractItem showBottomBorder={true} showButton={true} showPrograss={false} prograss={100} onClick={() => router.push({pathname:'/all-investment/250',query:{type:'completed'}})} showDuration={true} />
                <ContractItem showBottomBorder={true} showButton={true} showPrograss={false} prograss={100} onClick={() => router.push({pathname:'/all-investment/250',query:{type:'completed'}})} showDuration={true} />
                <ContractItem showBottomBorder={false} showButton={true} showPrograss={false} prograss={100} onClick={() => router.push({pathname:'/all-investment/250',query:{type:'completed'}})} showDuration={true} />
              </>
               ) : null}

               
                 
            </div>
          </Container>

          <div style={{ height: 96 }} />
        </div>

        <Footer css={styles.footer} />
      </div>
    </>
  )
}

const useStyles = makeStyles((props: InvestmentPageProps) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100%',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  heading: {
    fontSize: '48px',
    fontWeight: '600',
    color: '#3BA83B',
    marginBottom: '30px',
    [`@media (max-width: ${theme.widths.tabletXs})`]: {
      fontSize:'32px'
    },
  },
  navbar: {
    flexShrink: 1,
  },
  body: {
    flexGrow: 1,
  },
  footer: {
    flexShrink: 1,
  },
  products: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '50px',
    [`@media (max-width: ${theme.widths.tablet})`]: {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
    [`@media (max-width: ${theme.widths.tabletSm})`]: {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
    [`@media (max-width: ${theme.widths.mobile})`]: {
      gridTemplateColumns: 'repeat(1, 1fr)',
    },
   
  },
}))
