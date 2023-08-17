import { FC, useState } from 'react'
import { makeStyles } from '../utils'
import { Container } from '../ui'
import { EditIcon } from '../icons'
import { AttachIcon } from '../icons/AttachIcon'
import { theme } from '../theme'

interface SmartContractFormProps {
  handelClose: () => void
}

export const SmartContractForm: FC<SmartContractFormProps> = (props) => {
  const styles = useStyles(props)

  const { handelClose } = props

  const [showStep, setShowStep] = useState(1)

  const Step1 = () => (
    <div css={styles.mainContent}>
      <div css={styles.leftContent}>
        <h2 css={styles.title} style={{ marginTop: '20px' }}>
          Getting started
        </h2>

        <p css={{ marginTop: '40px' }}>
          <input type="radio" id="test2" name="radio-group" />
          <label htmlFor="test2" css={{ color: '#101010' }}>
            Create a new Purchase Order
          </label>
        </p>

        <div
          css={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '30px',
            marginLeft: '30px',
            marginTop: '20px',
            [`@media (max-width: ${theme.widths.tabletXs})`]: {
                gridTemplateColumns:'1fr'
            }
          }}
        >
          <div
            css={{
              border: '3px solid #D9D9D9',
              borderRadius: '10px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100px',
              position: 'relative',
            }}
          >
            <p css={{ position: 'absolute', left: '15px', top: '-5px' }}>
              <input type="radio" id="test4" name="radio-group" />
              <label htmlFor="test4" css={{ color: '#101010' }}></label>
            </p>
            <p css={{ fontWeight: '500', color: '#000', fontSize: '20px' }}>
              Spot order
            </p>
          </div>
          <div
            css={{
              border: '3px solid #D9D9D9',
              borderRadius: '10px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100px',
              position: 'relative',
            }}
          >
            <p css={{ position: 'absolute', left: '15px', top: '-5px' }}>
              <input type="radio" id="test5" name="radio-group" />
              <label htmlFor="test5" css={{ color: '#101010' }}></label>
            </p>
            <p css={{ fontWeight: '500', color: '#000', fontSize: '20px' }}>
              Program
            </p>
          </div>
        </div>

        <div
          css={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '20px',
            marginTop: '40px',
            [`@media (max-width: ${theme.widths.tabletXs})`]: {
                gridTemplateColumns:'1fr'
            }
          }}
        >
          <p>
            <input type="radio" id="test6" name="radio-group" />
            <label htmlFor="test6" css={{ color: '#101010' }}>
              Edit an existing draft
            </label>
          </p>
          <p>
            <input type="radio" id="test3" name="radio-group" />
            <label htmlFor="test3" css={{ color: '#101010' }}>
              Reuse a previous Purchase Order
            </label>
          </p>
        </div>
        <div
          css={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', [`@media (max-width: ${theme.widths.tabletXs})`]: {
            gap:'0'
        } }}
        >
          <div
            css={styles.selectContainer}
            style={{ margin: '0', marginLeft: '30px' }}
          >
            <select css={styles.select} name="" id="">
              <option value="1">Value 1</option>
              <option value="2">Value 2</option>
              <option value="3">Value 3</option>
            </select>
          </div>
          <div
            css={styles.selectContainer}
            style={{ margin: '0', marginLeft: '30px' }}
          >
            <select css={styles.select} name="" id="">
              <option value="1">Value 1</option>
              <option value="2">Value 2</option>
              <option value="3">Value 3</option>
            </select>
          </div>
        </div>
      </div>
      <div css={styles.rightContent}></div>
    </div>
  )
  const Step2 = () => (
    <div css={styles.mainContent}>
      <div css={styles.leftContent}>
        <p css={styles.step}>Step 2)</p>
        <h2 css={styles.title}>Describe the product</h2>
        <p css={styles.description}>
          Now let's provide the details about the product you wish to order.
          Please provide the following information:
        </p>
      </div>
      <div css={styles.rightContent}>
        <div css={{ padding: '20px 0', marginTop: '30px' }}>
          <p
            css={{
              fontSize: '20px',
              color: '#101010',
              fontWeight: '400',
              marginBottom: '2px',
            }}
          >
            Product name:
          </p>
          <p css={{ fontSize: '20px', color: '#101010', fontWeight: '600' }}>
            Fresh Mandarins
          </p>
        </div>
        <div
          css={{ background: '#B1E080', height: '1px', width: '160px' }}
        ></div>
        <div css={{ padding: '20px 0' }}>
          <div css={{ display: 'flex', alignItems: 'start', gap: '10px' }}>
            <div>
              <p
                css={{
                  fontSize: '20px',
                  color: '#101010',
                  fontWeight: '400',
                  marginBottom: '2px',
                }}
              >
                Varienty:
              </p>
              <p
                css={{ fontSize: '20px', color: '#101010', fontWeight: '600' }}
              >
                W. Murcott
              </p>
            </div>
            <EditIcon />
          </div>
        </div>
        <div
          css={{ background: '#B1E080', height: '1px', width: '160px' }}
        ></div>

        <div
          css={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '20px',
            marginTop: '10px',
          }}
        >
          <div css={styles.selectContainer}>
            <p css={styles.selectLabel}>Quality:</p>
            <select css={styles.select} name="" id="">
              <option value="1">Value 1</option>
              <option value="2">Value 2</option>
              <option value="3">Value 3</option>
            </select>
          </div>
        </div>
        <div
          css={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}
        >
          <div css={styles.selectContainer}>
            <p css={styles.selectLabel}>Size:</p>
            <select css={styles.select} name="" id="">
              <option value="1">Value 1</option>
              <option value="2">Value 2</option>
              <option value="3">Value 3</option>
            </select>
          </div>
          <div css={styles.selectContainer}>
            <p css={styles.selectLabel}>Presentation:</p>
            <select css={styles.select} name="" id="">
              <option value="1">Value 1</option>
              <option value="2">Value 2</option>
              <option value="3">Value 3</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
  const Step3 = () => (
    <div css={styles.mainContent}>
      <div css={styles.leftContent}>
        <p css={styles.step}>Step 3)</p>
        <h2 css={styles.title}>Specify delivery terms</h2>
        <p css={styles.description}>
          Let's establish the terms for product delivery and payment. Please
          provide the following details:
        </p>
      </div>
      <div css={styles.rightContent}>
        <div
          css={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '20px',
            marginTop: '30px',
          }}
        >
          <div css={styles.selectContainer}>
            <p css={styles.selectLabel}>Port of Loading:</p>
            <select css={styles.select} name="" id="">
              <option value="1">Value 1</option>
              <option value="2">Value 2</option>
              <option value="3">Value 3</option>
            </select>
          </div>
          <div css={styles.selectContainer}>
            <p css={styles.selectLabel}>Port of Destination:</p>
            <select css={styles.select} name="" id="">
              <option value="1">Value 1</option>
              <option value="2">Value 2</option>
              <option value="3">Value 3</option>
            </select>
          </div>
        </div>
        <div
          css={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', [`@media (max-width: ${theme.widths.tabletXs})`]: {
            gridTemplateColumns:'1fr'
        } }}
        >
          <div css={styles.selectContainer}>
            <p css={styles.selectLabel}>Choose a departure date:</p>
            <select css={styles.select} name="" id="">
              <option value="1">Value 1</option>
              <option value="2">Value 2</option>
              <option value="3">Value 3</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
  const Step4 = () => (
    <div css={styles.mainContent}>
      <div css={styles.leftContent}>
        <p css={styles.step}>Step 4)</p>
        <h2 css={styles.title}>Tell us about your payment terms</h2>
      </div>
      <div css={styles.rightContent}>
        <div css={styles.inputContainer}>
          <p css={styles.inputLabel}>Quantity:</p>
          <input
            type="number"
            style={{ width: '150px' }}
            placeholder="..."
            css={styles.input}
          />
        </div>
        <div css={styles.inputBorder}></div>
        <div css={styles.inputContainer}>
          <p css={styles.inputLabel}>Unit selector:</p>
          <div
            css={{
              border: '2px solid #3BA83B',
              borderRadius: '13px',
              padding: '8px 0',
              background: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <button
              css={{
                fontSize: '16px',
                fontWeight: '500',
                color: '#000',
                background: '#fff',
                border: '0',
                padding: '5px 10px',
                borderRight: '2px solid #3BA83B',
              }}
            >
              kg
            </button>
            <button
              css={{
                fontSize: '16px',
                fontWeight: '500',
                color: '#000',
                background: '#fff',
                border: '0',
                padding: '5px 10px',
                borderRight: '2px solid #3BA83B',
              }}
            >
              units
            </button>
            <button
              css={{
                fontSize: '16px',
                fontWeight: '500',
                color: '#000',
                background: '#fff',
                border: '0',
                padding: '5px 10px',
                borderRight: '2px solid #3BA83B',
              }}
            >
              40 ft. FCL
            </button>
            <button
              css={{
                fontSize: '16px',
                fontWeight: '500',
                color: '#000',
                background: '#fff',
                border: '0',
                padding: '5px 10px',
              }}
            >
              metric tons
            </button>
          </div>
        </div>
        <div css={styles.inputBorder}></div>
        <div css={styles.inputContainer}>
          <p css={styles.inputLabel}>Your offer:</p>
          <input type="number" placeholder="..." css={styles.input} />
        </div>
        <div css={styles.inputBorder}></div>
        <div css={styles.inputContainer}>
          <p css={styles.inputLabel}>Unit price:</p>
          <input type="number" placeholder="..." css={styles.input} />
        </div>
        <div css={styles.inputBorder}></div>
        <div css={styles.inputContainer}>
          <p css={styles.inputLabel}>Total price:</p>
          <input type="number" placeholder="..." css={styles.input} />
        </div>
        <div css={styles.inputContainer2}>
          <p css={styles.inputLabel} style={{ color: '#BFBEBE' }}>
            Payment terms:
          </p>
        </div>
        <div css={styles.inputContainer2}>
          <p css={styles.inputLabel}>Down payment:</p>
          <div css={{ display: 'flex', gap: '20px' }}>
            <div css={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="number"
                placeholder="..."
                css={styles.input}
                style={{ width: '100px' }}
              />
              <p css={{ color: '#BFBEBE', marginLeft: '10px' }}>%</p>
            </div>
            <input
              type="number"
              placeholder="..."
              css={styles.input}
              style={{ width: '100px' }}
            />
          </div>
        </div>
        <div css={styles.inputContainer2}>
          <p css={styles.inputLabel}>Cash against documents:</p>
          <div css={{ display: 'flex', gap: '20px' }}>
            <div css={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="number"
                placeholder="..."
                css={styles.input}
                style={{ width: '100px' }}
              />
              <p css={{ color: '#BFBEBE', marginLeft: '10px' }}>%</p>
            </div>
            <input
              type="number"
              placeholder="..."
              css={styles.input}
              style={{ width: '100px' }}
            />
          </div>
        </div>
        <div css={styles.inputContainer2}>
          <p css={styles.inputLabel}>On arrival:</p>
          <div css={{ display: 'flex', gap: '20px' }}>
            <div css={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="number"
                placeholder="..."
                css={styles.input}
                style={{ width: '100px' }}
              />
              <p css={{ color: '#BFBEBE', marginLeft: '10px' }}>%</p>
            </div>
            <input
              type="number"
              placeholder="..."
              css={styles.input}
              style={{ width: '100px' }}
            />
          </div>
        </div>
      </div>
    </div>
  )
  const Step5 = () => (
    <div css={styles.mainContent}>
      <div css={styles.leftContent}>
        <p css={styles.step}>Step 5)</p>
        <h2 css={styles.title}>Add Description</h2>
        <p
          css={{
            fontSize: '15px',
            color: '#101010',
            fontWeight: '400',
            margin: '30px 0 15px',
          }}
        >
          Speak with the Supplier.
        </p>
        <p
          css={{
            fontSize: '15px',
            color: '#101010',
            fontWeight: '400',
            marginBottom: '15px',
          }}
        >
          Suppliers look for:
        </p>

        <div
          css={{
            marginLeft: '20px',
            display: 'flex',
            gap: '10px',
            marginBottom: '15px',
          }}
        >
          <div
            css={{
              width: '10px',
              height: '10px',
              borderRadius: '5px',
              background: '#3BA83B',
              marginTop: '5px',
            }}
          ></div>
          <p
            css={{
              fontSize: '15px',
              color: '#101010',
              fontWeight: '400',
              width: '340px',
              [`@media (max-width: ${theme.widths.tabletXs})`]: {
                width:'100%'
            }
            }}
          >
            Clear expectations about your product requirement. Aim to attach a
            technical datasheet.
          </p>
        </div>
        <div
          css={{
            marginLeft: '20px',
            display: 'flex',
            gap: '10px',
            marginBottom: '15px',
          }}
        >
          <div
            css={{
              width: '10px',
              height: '10px',
              borderRadius: '5px',
              background: '#3BA83B',
              marginTop: '5px',
            }}
          ></div>
          <p
            css={{
              fontSize: '15px',
              color: '#101010',
              fontWeight: '400',
              width: '340px',
              [`@media (max-width: ${theme.widths.tabletXs})`]: {
                width:'100%'
            }
            }}
          >
            Tolerances and Certifications required
          </p>
        </div>
        <div
          css={{
            marginLeft: '20px',
            display: 'flex',
            gap: '10px',
            marginBottom: '15px',
          }}
        >
          <div
            css={{
              width: '10px',
              height: '10px',
              borderRadius: '5px',
              background: '#3BA83B',
              marginTop: '5px',
            }}
          ></div>
          <p
            css={{
              fontSize: '15px',
              color: '#101010',
              fontWeight: '400',
              width: '340px',
              [`@media (max-width: ${theme.widths.tabletXs})`]: {
                width:'100%'
            }
            }}
          >
            Good communication
          </p>
        </div>
        <div
          css={{
            marginLeft: '20px',
            display: 'flex',
            gap: '10px',
            marginBottom: '15px',
          }}
        >
          <div
            css={{
              width: '10px',
              height: '10px',
              borderRadius: '5px',
              background: '#3BA83B',
              marginTop: '5px',
            }}
          ></div>
          <p
            css={{
              fontSize: '15px',
              color: '#101010',
              fontWeight: '400',
              width: '340px',
              [`@media (max-width: ${theme.widths.tabletXs})`]: {
                width:'100%'
            }
            }}
          >
            Details about how you like to conduct operations
          </p>
        </div>
      </div>
      <div css={styles.rightContent}>
        <textarea
          name=""
          id=""
          rows={12}
          placeholder="Add description"
          css={{
            border: '2px solid #3BA83B',
            borderRadius: '10px',
            width: '100%',
            padding: '20px',
            fontSize: '16px',
            color: '#000',
            background: '#fff',
            marginTop: '50px',
            [`@media (max-width: ${theme.widths.tabletXs})`]: {
                height:'160px'
            }
          }}
        ></textarea>

        <div
          css={{
            display: 'flex',
            justifyContent: 'end',
            alignItems: 'center',
            margin: '20px 0',
            cursor: 'pointer',
          }}
        >
          <AttachIcon />
          <p
            css={{
              color: '#101010',
              fontSize: '15px',
              fontWeight: '400',
              marginLeft: '10px',
            }}
          >
            Attach a file
          </p>
        </div>
      </div>
    </div>
  )
  const Step6 = () => (
    <div css={styles.mainContent}>
      <div css={styles.leftContent}>
        <p css={styles.step}>Step 6)</p>
        <h2 css={styles.title}>Purchase Order Details</h2>
        <div css={{ padding: '10px 0', marginTop: '30px' }}>
          <p
            css={{
              fontSize: '20px',
              color: '#101010',
              fontWeight: '400',
            }}
          >
            Product name:
          </p>
          <p css={{ fontSize: '20px', color: '#101010', fontWeight: '600' }}>
            Fresh Mandarins
          </p>
        </div>
        <div
          css={{ background: '#B1E080', height: '1px', width: '260px' }}
        ></div>
        <div css={{ padding: '10px 0' }}>
          <p
            css={{
              fontSize: '20px',
              color: '#101010',
              fontWeight: '400',
            }}
          >
            Variety:
          </p>
          <p css={{ fontSize: '20px', color: '#101010', fontWeight: '600' }}>
            W. Murcott / CAT 1 / size: 1X, 2X, 3X
          </p>
        </div>
        <div
          css={{ background: '#B1E080', height: '1px', width: '260px' }}
        ></div>
        <div css={{ padding: '10px 0' }}>
          <p
            css={{
              fontSize: '20px',
              color: '#101010',
              fontWeight: '400',
            }}
          >
            Presentation:
          </p>
          <p css={{ fontSize: '20px', color: '#101010', fontWeight: '600' }}>
            3 Kg bulk tray
          </p>
        </div>
        <div
          css={{ background: '#B1E080', height: '1px', width: '260px' }}
        ></div>
        <div
          css={{
            padding: '10px 0',
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            flexWrap:'wrap'
          }}
        >
          <div>
            <p
              css={{
                fontSize: '20px',
                color: '#101010',
                fontWeight: '400',
              }}
            >
              Port of loading:
            </p>
            <p css={{ fontSize: '20px', color: '#101010', fontWeight: '600' }}>
              Callao, Peru
            </p>
          </div>
          <div>
            <p
              css={{
                fontSize: '20px',
                color: '#101010',
                fontWeight: '400',
              }}
            >
              Port of destination:
            </p>
            <p css={{ fontSize: '20px', color: '#101010', fontWeight: '600' }}>
              Itaqui, Brasil
            </p>
          </div>
          <div>
            <p
              css={{
                fontSize: '20px',
                color: '#101010',
                fontWeight: '400',
              }}
            >
              Departure date:
            </p>
            <p css={{ fontSize: '20px', color: '#101010', fontWeight: '600' }}>
              August 14, 2023
            </p>
          </div>
        </div>
        <div
          css={{ background: '#B1E080', height: '1px', width: '260px' }}
        ></div>

        <p
          css={{
            color: '#101010',
            fontSize: '20px',
            fontWeight: '400',
            margin: '20px 0 10px 0',
          }}
        >
          Description:
        </p>
        <p
          css={{
            color: '#000',
            fontSize: '14px',
            fontWeight: '500',
            lineHeight: 1.8,
          }}
        >
          I hope this message finds you well. My name is John, representing
          Produce International. We are interested in establishing a strong
          partnership with your esteemed company as we seek a reliable supplier
          of fresh mandarins in bulk quantities. Your reputation for providing
          superior produce aligns perfectly with our commitment to excellence.
          We are impressed by your distribution network's efficiency and timely
          deliveries, and we would love to discuss further details and explore
          the potential for a fruitful collaboration. Looking forward to your
          response.
        </p>
      </div>
      <div css={styles.rightContent}>
        <p
          css={{
            color: '#101010',
            fontSize: '20px',
            fontWeight: '600',
            margin: '50px 0 20px 0',
            textAlign: 'center',
          }}
        >
          Advanced conditions:
        </p>
        <div css={{ display: 'flex', alignItems: 'center', gap: '20px',margin:'15px 0' }}>
          <div className="switch">
            <input type="checkbox" hidden={true} id="username" />
            <label htmlFor="username"></label>
          </div>
          <p css={{ color: '#101010', fontSize: '20px', fontWeight: '400' }}>
            With brand / Generic brand
          </p>
        </div>
        <div css={{ display: 'flex', alignItems: 'center', gap: '20px', margin:'15px 0' }}>
          <div className="switch">
            <input type="checkbox" hidden={true} id="username2" />
            <label htmlFor="username2"></label>
          </div>
          <p css={{ color: '#101010', fontSize: '20px', fontWeight: '400' }}>
          With PLU / (by default off)
          </p>
        </div>

        <div css={{marginLeft:'30px'}}>
        <p css={{ marginTop: '20px' }}>
          <input type="radio" id="test20" name="radio-group" />
          <label htmlFor="test20" css={{ color:'#000 !important',fontSize:'20px' }}>
          Measure CO2 (+$200)
          </label>
        </p>
        <p css={{ marginTop: '10px' }}>
          <input type="radio" id="test21" name="radio-group" />
          <label htmlFor="test21" css={{ color:'#000 !important',fontSize:'20px' }}>
          Certifications
          </label>
        </p>
        </div>
      </div>
    </div>
  )
  const Step7 = () => (
    <div css={{ textAlign: 'center' }}>
      <h2 css={styles.title} style={{ marginTop: '50px' }}>
        Congratulations!
      </h2>
      <p
        css={{
          fontSize: '20px',
          margin: '15px 0 50px 0',
          fontWeight: '600',
          color: '#101010',
        }}
      >
        You have successfully submitted your order.
      </p>
      <button
        css={styles.btn}
        style={{ background: 'transparent' }}
        onClick={() => {
          handelClose()
          setTimeout(() => {
            setShowStep(1)
          }, 2000)
        }}
      >
        Go Back
      </button>
    </div>
  )

  const RenderStep = () => {
    switch (showStep) {
      case 1:
        return <Step1 />
        break
      case 2:
        return <Step2 />
        break
      case 3:
        return <Step3 />
        break
      case 4:
        return <Step4 />
        break
      case 5:
        return <Step5 />
        break
      case 6:
        return <Step6 />
        break
      case 7:
        return <Step7 />
        break

      default:
        return <Step1 />
        break
    }
  }

  return (
    <Container maxWidth="md">
      <div css={styles.root}>
        <div
          css={styles.prograssBarContainer}
          style={
            showStep === 7
              ? { width: '90%', margin: '0 auto', transition: '.5s' }
              : {}
          }
        >
          <div
            css={styles.prograssBar}
            style={{ width: `${(100 / 7) * showStep}%` }}
          ></div>
        </div>

        <RenderStep />

        <div
          css={styles.buttons}
          style={showStep === 7 ? { display: 'none' } : {}}
        >
          {showStep == 1 ? (
            <button
              css={styles.btn}
              style={{ background: 'transparent' }}
              onClick={handelClose}
            >
              Cancel
            </button>
          ) : (
            <button
              css={styles.btn}
              style={{ background: 'transparent' }}
              onClick={() => setShowStep((pre) => pre - 1)}
            >
              Go Back
            </button>
          )}

          <button
            css={styles.btn}
            onClick={() => setShowStep((pre) => pre + 1)}
          >
            Next Step
          </button>
        </div>
      </div>
    </Container>
  )
}

const useStyles = makeStyles(({}: SmartContractFormProps) => ({
  root: {
    paddingTop: '50px',
    [`@media (max-width: ${theme.widths.tabletXs})`]: {
      paddingTop:'80px'
  }
  },
  prograssBarContainer: {
    background: '#3BA83B',
    height: '2px',
    width: '500px',
    position: 'relative',
    borderRadius: '1px',
    [`@media (max-width: ${theme.widths.tablet})`]: {
        width:'400px'
    },
    
    [`@media (max-width: ${theme.widths.tabletXs})`]: {
        width:'100%'
    }
  },
  prograssBar: {
    background: '#3BA83B',
    height: '6px',
    width: '61%',
    position: 'absolute',
    bottom: '-2px',
    borderRadius: '3px',
    transition: '.5s',
  },
  mainContent: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '60px',
    [`@media (max-width: ${theme.widths.tablet})`]: {
        gridTemplateColumns: '1fr',
        gap:'20px'
    }
  },
  leftContent: {},
  rightContent: {},
  buttons: {
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'center',
    margin: '70px 0 30px 0',
    gap: '10px',
    flexWrap:'wrap',
    [`@media (max-width: ${theme.widths.tabletXs})`]: {
        justifyContent: 'center',
        marginTop:'30px'
    }
  },
  btn: {
    background: '#A8EFA8',
    border: '0',
    borderRadius: '13px',
    color: '#000',
    fontWeight: '500',
    fontSize: '16px',
    padding: '16px 20px',
    minWidth: '200px',
    cursor: 'pointer',
  },
  step: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#101010',
    marginTop: '20px',
  },
  title: {
    fontSize: '32px',
    fontWeight: '600',
    color: '#101010',
    marginTop: '5px',
    [`@media (max-width: ${theme.widths.tabletXs})`]: {
        fontSize:'22px'
    }
  },
  description: {
    fontSize: '15px',
    fontWeight: '400',
    color: '#101010',
    marginTop: '50px',
    width: '500px',
    [`@media (max-width: ${theme.widths.tabletXs})`]: {
        width:'100%',
        marginTop:'30px'
    }
  },
  selectContainer: {
    margin: '10px 0',
  },
  selectLabel: {
    fontSize: '20px',
    fontWeight: '400',
    color: '#101010',
  },
  select: {
    background: '#fff',
    borderRadius: '8px',
    border: '0',
    padding: '20px',
    width: '100%',
    fontSize: '16px',
    color: '#666',
    marginTop: '10px',
    boxShadow: '0px 4px 14px 0px rgba(0, 0, 0, 0.10)',
    backgroundImage: 'url("https://i.ibb.co/CWdj4HP/Chevron.png")',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 20px center',
    WebkitAppearance: 'none',
  },
  inputContainer: {
    display: 'grid',
    gridTemplateColumns: '200px auto',
    alignItems: 'center',
    gap: '60px',
    padding: '18px 0',
    [`@media (max-width: ${theme.widths.tablet})`]: {
        gap: '5px',
    },
    [`@media (max-width: ${theme.widths.tabletXs})`]: {
        gridTemplateColumns:'1fr'
    }
  },
  inputContainer2: {
    display: 'grid',
    gridTemplateColumns: '200px auto',
    alignItems: 'center',
    gap: '60px',
    padding: '8px 0',
    [`@media (max-width: ${theme.widths.tablet})`]: {
        gap: '5px',
    },
    [`@media (max-width: ${theme.widths.tabletXs})`]: {
       gridTemplateColumns:'1fr'
    }
  },
  inputLabel: {
    color: '#000',
    fontSize: '16px',
    fontWeight: '500',
    textAlign: 'right',
    [`@media (max-width: ${theme.widths.tablet})`]: {
        textAlign:'left'
    }
  },
  input: {
    border: '2px solid #3BA83B',
    borderRadius: '13px',
    padding: '13px 18px',
    width: '250px',
    color: '#3BA83B',
  },
  inputBorder: {
    background: '#B1E080',
    height: '1px',
    width: '260px',
    marginLeft: '100px',
    [`@media (max-width: ${theme.widths.tabletXs})`]: {
        marginLeft:0
    }
  },
}))
