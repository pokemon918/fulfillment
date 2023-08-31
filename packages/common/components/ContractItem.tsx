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
}

function ContractItem({
  showBottomBorder = true,
  showPrograss = false,
  showButton = true,
  prograss = 100,
  onClick,
  showDuration = false,
  showinvestNowBtn = false,
}: Props) {
  const router = useRouter()
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
              src="https://api.trumarket.tech/files/b734deb018f4bb11d0150db829d5a206d68c30db15b825264621126c4c92144fc9c1dcd0b075e222958589fc52f04867.jpg"
              alt=""
            />
          </div>

          <div css={{ marginLeft: '55px' }}>
            <p css={{ fontSize: '12px', fontWeight: '400', color: '#101010' }}>
              Product name:{' '}
              <span css={{ fontWeight: '600' }}>Fresh Blueberries</span>
            </p>
            <p css={{ fontSize: '12px', fontWeight: '400', color: '#101010' }}>
              Origin: <span css={{ fontWeight: '600' }}>Lima</span>
            </p>
            <p css={{ fontSize: '12px', fontWeight: '400', color: '#101010' }}>
              Destination: <span css={{ fontWeight: '600' }}>Peru</span>
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
              {prograss}% completed
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
                width: prograss + '%',
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
            Amount of contract: 10,000 USD
          </p>
          <p css={{ fontSize: '15px', fontWeight: '400', color: '#101010' }}>
            Currently funded: 10,000 USD
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
                Duration: 189 days
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
                Profit: 9.4%
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
                Risk: D
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
