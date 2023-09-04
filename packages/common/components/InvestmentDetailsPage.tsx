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
import SupplierLogo from "../assets/images/supplier_logo.png"
import BuyerLogo from "../assets/images/buyer_logo.png"
import {useRouter} from 'next/router'

interface InvestmentDetailsPageProps {
  data: any
}

export function InvestmentDetailsPage(props: InvestmentDetailsPageProps) {
  const {data} = props

  const user = useUser()
const router = useRouter();
  const styles = useStyles(props);

  let totalAmount = data?.quantity * data?.offerPrice;
  totalAmount = data?.measure ? totalAmount + 200 : totalAmount;
  const investedAmount = data?.investedAmount ? data?.investedAmount : 0;
  const mainPrograss = (totalAmount / 100) * investedAmount;

  const CheckedStep = ({name} : any) => (
    <div
    css={{
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'center',
      zIndex: 1,
    }}
  >
    <CheckIcon width={41} height={41} />
    <p css={{ fontSize: '16px', fontWeight: '500', color: '#000',marginTop:'12px' }}>
      {name}
    </p>
    <p css={{ fontSize: '12px', fontWeight: '400', color: '#000',marginTop:'5px' }}>
      09/10/2023
    </p>
  </div>
  )

  const PrograssStep = ({name} : any) => (
    <div
                css={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  zIndex: 1,
                }}
              >
                <div
                  css={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '20px',
                    background: '#fff',
                    border: '12px solid #BEBEBE',
                  }}
                ></div>
                <p css={{ fontSize: '16px', fontWeight: '500', color: '#000',marginTop:'12px'  }}>
                  {name}
                </p>
                <p css={{ fontSize: '12px', fontWeight: '400', color: '#000',marginTop:'5px' }}>
                  09/10/2023
                </p>
              </div>
  )

  return (
    <>
      <PageBgColor bgColor="#f8f8f8" />

      <div css={styles.root}>
        <Navbar css={styles.navbar} />

        <div css={styles.body}>
          <div style={{ height: 48 }} />

          <Container maxWidth="md">
            <h2
              css={{
                fontSize: '32px',
                color: '#101010',
                fontWeight: '600',
                marginBottom: '20px',
              }}
            >
             {data?.product.name.en}
            </h2>

            <div
              css={{
                display: 'grid',
                gridTemplateColumns: '1fr 1px 1fr',

                overflow: 'hidden',
              }}
            >
              <div>
                <div css={{ display: 'flex' }}>
                  <div
                    css={{
                      width: '180px',
                      height: '180px',
                      overflow: 'hidden',
                    }}
                  >
                    <img
                      css={{
                        width: '100%',
                        objectFit: 'cover',
                        height: '100%',
                        borderRadius: '15px',
                      }}
                      src={data?.product.thumbnail}
                      alt=""
                    />
                  </div>

                  <div css={{ marginLeft: '55px', marginTop: '50px' }}>
                    <p
                      css={{
                        fontSize: '15px',
                        fontWeight: '400',
                        color: '#101010',
                      }}
                    >
                      Product name:{' '}
                      <span css={{ fontWeight: '600' }}>{data?.product.name.en}</span>
                    </p>
                    <p
                      css={{
                        fontSize: '15px',
                        fontWeight: '400',
                        color: '#101010',
                      }}
                    >
                      Origin: <span css={{ fontWeight: '600' }}>{data?.portOfLoading.split(',')[0]}</span>
                    </p>
                    <p
                      css={{
                        fontSize: '15px',
                        fontWeight: '400',
                        color: '#101010',
                      }}
                    >
                      Destination: <span css={{ fontWeight: '600' }}>{data?.portOfLoading.split(',')[1]}</span>
                    </p>
                  </div>
                </div>

                <div css={{ marginTop: '50px', marginBottom: '20px' }}>
                  <p
                    css={{
                      fontSize: '15px',
                      color: '#101010',
                      fontWeight: '400',
                    }}
                  >
                    Variety:
                  </p>
                  <p
                    css={{
                      fontSize: '15px',
                      color: '#101010',
                      fontWeight: '600',
                    }}
                  >
                    {data?.product.availableSpecs.en}
                  </p>
                </div>

                <div
                  css={{ background: '#B1E080', height: '1px', width: '360px' }}
                ></div>
                <div css={{ marginTop: '5px', marginBottom: '20px' }}>
                  <p
                    css={{
                      fontSize: '15px',
                      color: '#101010',
                      fontWeight: '400',
                    }}
                  >
                    Presentation:
                  </p>
                  <p
                    css={{
                      fontSize: '15px',
                      color: '#101010',
                      fontWeight: '600',
                    }}
                  >
                    2 Kg
                  </p>
                </div>

                <div
                  css={{ background: '#B1E080', height: '1px', width: '360px' }}
                ></div>

                <div
                  css={{
                    marginTop: '5px',
                    marginBottom: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px',
                    flexWrap: 'wrap',
                  }}
                >
                  <div>
                    <p
                      css={{
                        fontSize: '15px',
                        color: '#101010',
                        fontWeight: '400',
                      }}
                    >
                      Port of loading:
                    </p>
                    <p
                      css={{
                        fontSize: '15px',
                        color: '#101010',
                        fontWeight: '600',
                      }}
                    >
                      {data?.portOfArrival}
                    </p>
                  </div>
                  <div>
                    <p
                      css={{
                        fontSize: '15px',
                        color: '#101010',
                        fontWeight: '400',
                      }}
                    >
                      Port of destination:
                    </p>
                    <p
                      css={{
                        fontSize: '15px',
                        color: '#101010',
                        fontWeight: '600',
                      }}
                    >
                      {data?.portOfLoading}
                    </p>
                  </div>
                  <div>
                    <p
                      css={{
                        fontSize: '15px',
                        color: '#101010',
                        fontWeight: '400',
                      }}
                    >
                      Departure date:
                    </p>
                    <p
                      css={{
                        fontSize: '15px',
                        color: '#101010',
                        fontWeight: '600',
                      }}
                    >
                     {data?.departureDate}
                    </p>
                  </div>
                </div>

{
  router.query?.type && (
    <div css={{display: 'flex',
    gap: '30px',
    alignItems: 'center',
    marginTop: '50px'}}>
                      <p css={{fontWeight:500,fontSize:'16px',color:'#000'}}>Amount you funded:</p>
                      <input css={{border: '2px solid #3BA83B',
    padding: '10px 20px',
    width: '100px',
    borderRadius: '10px',fontWeight:'500',fontSize:'14px',color:"#3BA83B"}} type="text" readOnly value={'105$'} />
                    </div>
  )
}

               
              </div>

              <div
                css={{
                  background: '#3BA83B',
                  width: '1px',
                  height: '130px',
                  borderRadius: '3px',
                  marginTop: '50px',
                }}
              ></div>

              <div css={{ width: '80%', margin: '0 auto' }}>
              <p css={{ fontSize: '20px', fontWeight: '600', color: '#101010' }}>
            {' '}
            Currently funded:{' '}
            <span
              css={{
                fontSize: '13px',
                fontWeight: '400',
                color: '#43AB36',
                marginLeft: '8px',
              }}
            >
              {mainPrograss}% completed
            </span>
          </p>
          <div
            css={{
              width: '100%',
              height: '8px',
              background: '#3BA83B',
              borderRadius: '100px',
              margin: '15px 0',
              position: 'relative',
            }}
          >
            <div
              css={{
                background: '#B0DA54',
                position: 'absolute',
                width:  mainPrograss+'%',
                height: '8px',
                borderRadius: '100px',
              }}
            ></div>
          </div>
          <p
            css={{
              fontSize: '15px',
              fontWeight: '400',
              color: '#101010',
              marginBottom: '5px',
            }}
          >
            Amount of contract: {totalAmount} USD
          </p>
          <p css={{ fontSize: '15px', fontWeight: '400', color: '#101010' }}>
            Currently funded: {investedAmount} USD
          </p>

         
            <div
              css={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                alignItems: 'center',
                justifyContent: 'space-around',
                marginTop: '10px',
              }}
            >
              <p
                css={{ fontSize: '15px', fontWeight: '400', color: '#101010' }}
              >
                Duration: {data?.duration} weeks
              </p>

              <p
                css={{
                  fontSize: '15px',
                  fontWeight: '400',
                  color: '#101010',
                  borderLeft: '1px solid #3BA83B',
                  paddingLeft: '20px',
                }}
              >
                Profit: {data?.return}%
              </p>

              <p
                css={{
                  fontSize: '15px',
                  fontWeight: '400',
                  color: '#101010',
                  borderLeft: '1px solid #3BA83B',
                  paddingLeft: '20px',
                }}
              >
                Risk: {data?.risk}
              </p>
            </div>
            <p
                  css={{
                    fontSize: '20px',
                    fontWeight: '400',
                    color: '#101010',
                    marginBottom: '10px',
                    marginTop:'30px'
                  }}
                >
                  A message from the supplier:
                </p>
                <p
                  css={{
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#000',
                    lineHeight: '28px',
                  }}
                >
                  {data?.description.en}
                </p>
              </div>
            </div>

{router.query?.type && (
  <>
  <h2
              css={{
                fontSize: '32px',
                color: '#101010',
                fontWeight: '600',
                margin: '40px 0',
                textAlign: 'center',
              }}
            >
              Milestones
            </h2>

            <div
              css={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '20px',
                position: 'relative',
              }}
            >
              <div
                css={{
                  position: 'absolute',
                  height: '3px',
                  width: '93%',
                  background: '#BEBEBE',
                  top: '21px',
                  left: '28px',
                }}
              ></div>
              <div
                css={{
                  position: 'absolute',
                  height: '3px',
                  width: router.query?.type == 'prograss'? '25%' : '93%',
                  background: '#3BA83B',
                  top: '21px',
                  left: '28px',
                }}
              ></div>

{router.query?.type == 'prograss' ? (
<>
<CheckedStep name="Production" />
           <CheckedStep name="Packaging House" />

           <PrograssStep name="Processing" />
           <PrograssStep name="Finished Product" />
           <PrograssStep name="Loading" />
           <PrograssStep name="Port of Origin" />
           <PrograssStep name="Transit" />
           <PrograssStep name="Port of Destination" />
</>
) : router.query?.type == 'completed' ? (
<>
<CheckedStep name="Production" />
           <CheckedStep name="Packaging House" />

           <CheckedStep name="Processing" />
           <CheckedStep name="Finished Product" />
           <CheckedStep name="Loading" />
           <CheckedStep name="Port of Origin" />
           <CheckedStep name="Transit" />
           <CheckedStep name="Port of Destination" />
</>
) : null}
             
           

              
          
            </div>
  </>
)}
            

{router.query?.type ? null : (
  <div style={{display: 'flex',
alignItems: 'center',
justifyContent: 'end',
margin: '50px 0',
gap: '70px'}}>

<button onClick={() => router.push('/all-investment')}  css={{cursor:'pointer', background: 'transparent',
border: '0',
borderRadius: '13px',
padding: '10px 26px',
fontSize: '14px',
fontWeight: '500',
color: '#3BA83B'}}>Return back</button>
<button css={{background: 'transparent',
border: '3px solid #3BA83B',
borderRadius: '13px',
padding: '10px 26px',
fontSize: '14px',
fontWeight: '500',
color: '#3BA83B'}}>Invest now</button>
</div>
)}


            <div>

<img src={SupplierLogo.src} alt="" css={{margin: '0 auto',
display: 'block',
marginTop: '50px'}}  />
<h2
css={{
fontSize: '32px',
color: '#101010',
fontWeight: '600',
margin: '40px 0',
textAlign: 'center',
}}
>
About the supplier
</h2>
<p
  css={{
    fontSize: '14px',
    fontWeight: '500',
    color: '#000',
    lineHeight: '28px',
  }}
>
  Loren ipsun dolor sit anet, consectetur adipisci elit, sed eiusnod tenpor incidunt ut labore et dolore nagna aliqua. Ut enin ad ninin venian, quis nostrun exercitationen ullan corporis suscipit laboriosan, nisi ut aliquid ex ea connodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillun dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt nollit anin id est laborun.
Loren ipsun dolor sit anet, consectetur adipisci elit, sed eiusnod tenpor incidunt ut labore et dolore nagna aliqua. Ut enin ad ninin venian, quis nostrun exercitationen ullan corporis suscipit laboriosan, nisi ut aliquid ex ea connodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillun dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt nollit anin id est laborun.
</p>
</div>
            <div>

<img src={BuyerLogo.src} alt="" css={{margin: '0 auto',
display: 'block',
marginTop: '50px'}}  />
<h2
css={{
fontSize: '32px',
color: '#101010',
fontWeight: '600',
margin: '40px 0',
textAlign: 'center',
}}
>
About the buyer
</h2>
<p
  css={{
    fontSize: '14px',
    fontWeight: '500',
    color: '#000',
    lineHeight: '28px',
  }}
>
  Loren ipsun dolor sit anet, consectetur adipisci elit, sed eiusnod tenpor incidunt ut labore et dolore nagna aliqua. Ut enin ad ninin venian, quis nostrun exercitationen ullan corporis suscipit laboriosan, nisi ut aliquid ex ea connodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillun dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt nollit anin id est laborun.
Loren ipsun dolor sit anet, consectetur adipisci elit, sed eiusnod tenpor incidunt ut labore et dolore nagna aliqua. Ut enin ad ninin venian, quis nostrun exercitationen ullan corporis suscipit laboriosan, nisi ut aliquid ex ea connodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillun dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt nollit anin id est laborun.
</p>
</div>

{router.query?.type && (
  <button onClick={() => router.push('/all-investment')}  css={{cursor:'pointer', background: 'transparent',
  border: '2px solid #3BA83B',
  borderRadius: '13px',
  padding: '10px 26px',
  fontSize: '14px',
  fontWeight: '500',
  color: '#3BA83B',float: 'right',
  marginTop: '20px'}}>Return back</button>
)}
          </Container>

          <div style={{ height: 96 }} />
        </div>

        <Footer css={styles.footer} />
      </div>
    </>
  )
}

const useStyles = makeStyles((props: InvestmentDetailsPageProps) => ({
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
      fontSize: '32px',
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
