import React from 'react'
import { CheckIcon, MoreBtnIcon } from '../icons'
import { useRouter } from 'next/router'

type Props = {
  showBottomBorder: boolean | undefined
  showPrograss: boolean | undefined
  showButton: boolean | undefined
  prograss: number | undefined
  onClick: () => void
  showDuration?: boolean
  showinvestNowBtn?: boolean
  data?: any
}

function ContractItem({
  showBottomBorder = true,
  showPrograss = false,
  showButton = true,
  prograss = 100,
  onClick,
  showDuration = false,
  showinvestNowBtn = false,
  data
}: Props) {
  const router = useRouter();
  let totalAmount = data?.quantity * data?.offerPrice;
  totalAmount = data?.measure ? totalAmount + 200 : totalAmount;
  const investedAmount = data?.investedAmount ? data?.investedAmount : 0;
  const mainPrograss = (totalAmount / 100) * investedAmount;
  return (
    <>
      <div
        css={{
          display: 'grid',
          gridTemplateColumns: '1fr 1px 1fr',
          alignItems: 'center',
          border: '2px solid #3BA83B',
          borderRadius: '20px',
          overflow: 'hidden',
          margin: '60px 0',
        }}
      >
        <div css={{ display: 'flex', alignItems: 'center' }}>
          <div css={{ width: '180px', height: '180px', overflow: 'hidden' }}>
            <img
              css={{ width: '100%', objectFit: 'cover', height: '100%' }}
              src={data?.product.thumbnail}
              alt=""
            />
          </div>

          <div css={{ marginLeft: '55px' }}>
            <p css={{ fontSize: '12px', fontWeight: '400', color: '#101010' }}>
              Product name:{' '}
              <span css={{ fontWeight: '600' }}>{data?.product.name.en}</span>
            </p>
            <p css={{ fontSize: '12px', fontWeight: '400', color: '#101010' }}>
              Origin: <span css={{ fontWeight: '600' }}>{data?.portOfLoading.split(',')[0]}</span>
            </p>
            <p css={{ fontSize: '12px', fontWeight: '400', color: '#101010' }}>
              Destination: <span css={{ fontWeight: '600' }}>{data?.portOfLoading.split(',')[1]}</span>
            </p>

            {showPrograss && (
              <div
                css={{
                  width: '150px',
                  height: '3px',
                  background: '#BEBEBE',
                  position: 'relative',
                  margin: '25px 0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div
                  css={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1,
                  }}
                >
                  <CheckIcon width={17} height={17} />
                </div>
                <div
                  css={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '15px',
                    border: '8px solid #3BA83B',
                    background: '#fff',
                    zIndex: '1',
                  }}
                >
                  <div></div>
                </div>
                <div
                  css={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '10px',
                    border: '6px solid #BEBEBE',
                    background: '#fff',
                    zIndex: 1,
                  }}
                >
                  <div></div>
                </div>
                <div
                  css={{
                    width: '50%',
                    height: '3px',
                    background: '#3BA83B',
                    position: 'absolute',
                  }}
                ></div>
              </div>
            )}

            {showButton && (
              <button
                onClick={onClick}
                css={{
                  cursor: 'pointer',
                  background: 'transparent',
                  border: '3px solid #3BA83B',
                  borderRadius: '13px',
                  padding: '10px 26px',
                  display: 'flex',
                  gap: '15px',
                  WebkitBoxAlign: 'center',
                  alignItems: 'center',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#3BA83B',
                  marginTop: '20px',
                }}
              >
                {showinvestNowBtn ? 'Invest now' : 'More details'}{' '}
                <MoreBtnIcon />
              </button>
            )}
          </div>
        </div>
        <div
          css={{
            background: '#3BA83B',
            width: '1px',
            height: '130px',
            borderRadius: '3px',
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
                width: mainPrograss + '%',
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

          {showDuration && (
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
          )}
        </div>
      </div>
      {showBottomBorder ? (
        <div
          css={{
            width: '60%',
            height: '2px',
            background: '#3BA83B',
            margin: '0 auto',
            border: '10px',
          }}
        ></div>
      ) : null}
    </>
  )
}

export default ContractItem
