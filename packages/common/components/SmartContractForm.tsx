import { FC, useState } from 'react'
import { gql, graphqlReq, makeStyles, uploadFile } from '../utils'
import { Container } from '../ui'
import { EditIcon } from '../icons'
import { AttachIcon } from '../icons/AttachIcon'
import { theme } from '../theme'
import { AssetUpload } from './AssetUpload'
import { countries } from '../data'

function formatDate(dateString: any) {
  const options: any = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

const NumberFormatter = (value: number) => {
  return value.toFixed(2); 
}



interface SmartContractFormProps {
  handelClose: () => void
  product: any
}

export const SmartContractForm: FC<SmartContractFormProps> = (props) => {
  const styles = useStyles(props)

  const { handelClose, product } = props
  //console.log(product)
  const [showStep, setShowStep] = useState(1)
  const [isNewPurchaseChecked, setIsNewPurchaseChecked] = useState(true)
  const [showDarftOrder, setShowDarftOrder] = useState(false)
  const [showPreviousOrder, setShowPrevioustOrder] = useState(false)
  const [smartContractData, setSmartContractData] = useState<any>({
    portOfLoadingSelect: 'Peru',
    portOfArrivalSelect: 'Peru',
  })

  const [brandType, setbrandType] = useState(true)
  const [pluType, setpluType] = useState(false)
  const [measure, setmeasure] = useState(false)
  const [certification, setcertification] = useState(false);
  const [certificationData, setcertificationData] = useState<any>([]);
  const [attachFile, setAttachFile] = useState<any>(null)
  const [loading, setLoading] = useState(false);

  const handleCheckboxChange = (certificationName: any) => {
    setcertificationData((prevData : any) =>
      prevData.includes(certificationName)
        ? prevData.filter((cert:any) => cert !== certificationName)
        : [...prevData, certificationName]
    );
  };

  const CREATE_SMART_CONTRACT = gql`
    mutation CreateContract($input: CreateContractInput!) {
      contract: createContract(input: $input) {
        _id
        productId
      }
    }
  `

  const submitSmartConData = async () => {
    setLoading(true)
    let attachFileUrl: any = ''
    if (attachFile) {
      const formData = new FormData()

      formData.append('files', attachFile)

      attachFileUrl = await uploadFile({
        formData,
        onUploadProgress: (progress) => {},
      })
     // console.log(attachFileUrl)
    }

    const inputData = {
      productId: product._id,
      isExisting: false,
      portOfLoading:
        smartContractData.portOfLoadingInput +
        ', ' +
        smartContractData.portOfLoadingSelect,
      portOfArrival:
        smartContractData.portOfArrivalInput +
        ', ' +
        smartContractData.portOfArrivalSelect,
      departureDate: smartContractData.departureDate,
      offerPrice: Number(smartContractData.offerPrice),
      unit: 'kg',
      quantity: Number(smartContractData.quantity),
      downPayment: smartContractData.downPayment,
      cashAgainstDocuments: smartContractData.cashAgainstDocuments,
      arrival: smartContractData.arrival,
      description: { en: smartContractData.description, es: '' },
      brandType,
      pluType,
      measure,
      attachment: attachFileUrl && attachFileUrl.data[0],
      certifications: certificationData,
    }
    //console.log(inputData)

    const data1 = await graphqlReq(CREATE_SMART_CONTRACT, { input: inputData })
    //console.log(data1)
  }

  const QuantityFunc = (e:any) => {
    setSmartContractData({
      ...smartContractData,
      quantity: e.target.value,
      totalPrice: NumberFormatter(Number(e.target.value) * smartContractData.offerPrice),
      downPayment: NumberFormatter((Number(e.target.value) *
      smartContractData.offerPrice *
      smartContractData.downPaymentPercent) /
    100),
      cashAgainstDocuments: NumberFormatter((Number(e.target.value) *
      smartContractData.offerPrice *
      smartContractData.cashAgainstDocumentsPercent) /
    100),
      arrival: NumberFormatter((Number(e.target.value) *
      smartContractData.offerPrice *
      smartContractData.arrivalPercent) /
    100),
    })
  }

  const YourOfferFunc = (e:any) => {
    setSmartContractData({
      ...smartContractData,
      offerPrice: e.target.value,
      totalPrice: NumberFormatter(Number(e.target.value) * smartContractData.quantity),
      downPayment: NumberFormatter((Number(e.target.value) *
      smartContractData.quantity *
      smartContractData.downPaymentPercent) /
    100),
      cashAgainstDocuments: NumberFormatter((Number(e.target.value) *
      smartContractData.quantity *
      smartContractData.cashAgainstDocumentsPercent) /
    100),
      arrival: NumberFormatter((Number(e.target.value) *
      smartContractData.quantity *
      smartContractData.arrivalPercent) /
    100),
    })
  }

  const Step1 = () => (
    <div css={styles.mainContent}>
      <div css={styles.leftContent}>
        <h2 css={styles.title} style={{ marginTop: '20px' }}>
          Getting started
        </h2>

        <p css={{ marginTop: '40px' }}>
          <input
            type="radio"
            checked={isNewPurchaseChecked}
            onChange={(e) => setIsNewPurchaseChecked(e.target.checked)}
            name="radio-group"
            id="test2"
          />
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
              gridTemplateColumns: '1fr',
            },
          }}
        >
          <label
            htmlFor="test4"
            css={{
              border: '3px solid #D9D9D9',
              borderRadius: '10px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100px',
              position: 'relative',
              cursor: 'pointer',
            }}
            onClick={() => setIsNewPurchaseChecked(true)}
          >
            <p css={{ position: 'absolute', left: '15px', top: '-5px' }}>
              <input type="radio" id="test4" name="order_type1" />
              <label htmlFor="test4" css={{ color: '#101010' }}></label>
            </p>
            <p css={{ fontWeight: '500', color: '#000', fontSize: '20px' }}>
              Spot order
            </p>
          </label>
          <label
            htmlFor="test5"
            css={{
              border: '3px solid #D9D9D9',
              borderRadius: '10px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100px',
              position: 'relative',
              cursor: 'pointer',
            }}
            onClick={() => setIsNewPurchaseChecked(true)}
          >
            <p css={{ position: 'absolute', left: '15px', top: '-5px' }}>
              <input type="radio" id="test5" name="order_type1" />
              <label htmlFor="test5" css={{ color: '#101010' }}></label>
            </p>
            <p css={{ fontWeight: '500', color: '#000', fontSize: '20px' }}>
              Program
            </p>
          </label>
        </div>

        {/* <div
          css={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '20px',
            marginTop: '40px',
            [`@media (max-width: ${theme.widths.tabletXs})`]: {
              gridTemplateColumns: '1fr',
            },
          }}
        >
          <p>
            <input
              type="radio"
              id="test6"
              name="radio-group"
              onChange={(e) => {
                setShowDarftOrder(true)
                setShowPrevioustOrder(false)
                setIsNewPurchaseChecked(false)
              }}
            />
            <label htmlFor="test6" css={{ color: '#101010' }}>
              Edit an existing draft
            </label>
          </p>
          <p onClick={() => setIsNewPurchaseChecked(false)}>
            <input
              type="radio"
              id="test3"
              name="radio-group"
              onChange={(e) => {
                setShowDarftOrder(false)
                setShowPrevioustOrder(true)
                setIsNewPurchaseChecked(false)
              }}
            />
            <label htmlFor="test3" css={{ color: '#101010' }}>
              Reuse a previous Purchase Order
            </label>
          </p>
        </div>
        <div
          css={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '20px',
            [`@media (max-width: ${theme.widths.tabletXs})`]: {
              gap: '0',
            },
          }}
        >
          <div
            css={styles.selectContainer}
            style={{ margin: '0', marginLeft: '30px' }}
          >
            {showDarftOrder ? (
              <select css={styles.select} name="" id="">
                <option value="1">Value 1</option>
                <option value="2">Value 2</option>
                <option value="3">Value 3</option>
              </select>
            ) : null}
          </div>
          <div
            css={styles.selectContainer}
            style={{ margin: '0', marginLeft: '30px' }}
          >
            {showPreviousOrder ? (
              <select css={styles.select} name="" id="">
                <option value="1">Value 1</option>
                <option value="2">Value 2</option>
                <option value="3">Value 3</option>
              </select>
            ) : null}
          </div>
        </div> */}
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
            {product?.name}
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
                Variety:
              </p>
              <p
                css={{ fontSize: '20px', color: '#101010', fontWeight: '600' }}
              >
                {product?.availableSpecs}
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
              <option value="1">{product?.availableSpecs.split(" / ")[1]}</option>
            </select>
          </div>
        </div>
        <div
          css={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}
        >
          <div css={styles.selectContainer}>
            <p css={styles.selectLabel}>Size:</p>
            <select css={styles.select} name="" id="">
              <option value="1">{product?.availableSpecs.split(" / ")[2]}</option>
            </select>
          </div>
          <div css={styles.selectContainer}>
            <p css={styles.selectLabel}>Presentation:</p>
            <select css={styles.select} name="" id="">
              <option value="1">{product?.availableSpecs.split(" / ")[0]}</option>
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
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                marginTop: '10px',
                boxShadow: '0px 4px 14px 0px rgba(0, 0, 0, 0.10)',
                borderRadius: '8px',
                overflow: 'hidden',
              }}
            >
              <input
                defaultValue={smartContractData.portOfLoadingInput}
                onBlur={(e) =>
                  setSmartContractData({
                    ...smartContractData,
                    portOfLoadingInput: e.target.value,
                  })
                }
                type="text"
                placeholder="Port of Loading"
                style={{
                  background: '#fff',

                  border: '0',
                  padding: '20px',
                  width: '100%',
                  fontSize: '16px',
                  color: '#666',
                }}
              />
              <select
                defaultValue={smartContractData.portOfLoadingSelect}
                onBlur={(e) =>
                  setSmartContractData({
                    ...smartContractData,
                    portOfLoadingSelect: e.target.value,
                  })
                }
                css={styles.select}
                name=""
                id=""
                style={{ borderRadius: 0, boxShadow: 'inherit', marginTop: 0 }}
              >
                {countries.map((v) => (
                  <option value={v.name}>{v.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div css={styles.selectContainer}>
            <p css={styles.selectLabel}>Port of Destination:</p>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                marginTop: '10px',
                boxShadow: '0px 4px 14px 0px rgba(0, 0, 0, 0.10)',
                borderRadius: '8px',
                overflow: 'hidden',
              }}
            >
              <input
                defaultValue={smartContractData.portOfArrivalInput}
                onBlur={(e) =>
                  setSmartContractData({
                    ...smartContractData,
                    portOfArrivalInput: e.target.value,
                  })
                }
                type="text"
                placeholder="Port of Destination"
                style={{
                  background: '#fff',

                  border: '0',
                  padding: '20px',
                  width: '100%',
                  fontSize: '16px',
                  color: '#666',
                }}
              />
              <select
                defaultValue={smartContractData.portOfArrivalSelect}
                onBlur={(e) =>
                  setSmartContractData({
                    ...smartContractData,
                    portOfArrivalSelect: e.target.value,
                  })
                }
                css={styles.select}
                name=""
                id=""
                style={{ borderRadius: 0, boxShadow: 'inherit', marginTop: 0 }}
              >
                {countries.map((v) => (
                  <option value={v.name}>{v.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div
          css={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '20px',
            [`@media (max-width: ${theme.widths.tabletXs})`]: {
              gridTemplateColumns: '1fr',
            },
          }}
        >
          <div css={styles.selectContainer}>
            <p css={styles.selectLabel}>Choose a departure date:</p>
            <input
              type="date"
              defaultValue={smartContractData.departureDate}
              onBlur={(e) =>
                setSmartContractData({
                  ...smartContractData,
                  departureDate: e.target.value,
                })
              }
              name=""
              id=""
              css={styles.select}
              style={{ backgroundImage: 'none' }}
            />
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
          <p css={styles.inputLabel}>Quantity (kg):</p>
          <input
            type="number"
            style={{ width: '150px' }}
            placeholder="..."
            css={styles.input}
            defaultValue={smartContractData.quantity}
            onBlur={QuantityFunc}
          />
        </div>
        {/* <div css={styles.inputBorder}></div>
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
              width: '50px',
            }}
          >
            <button
              css={{
                fontSize: '16px',
                fontWeight: '500',
                color: '#3BA83B',
                background: '#fff',
                border: '0',
                padding: '5px 10px',
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
        </div> */}
        <div css={styles.inputBorder}></div>
        <div css={styles.inputContainer}>
          <p css={styles.inputLabel}>Your offer:</p>
          <input
            type="number"
            placeholder="..."
            css={styles.input}
            defaultValue={smartContractData.offerPrice}
            onBlur={YourOfferFunc}
          />
        </div>
        <div css={styles.inputBorder}></div>
        <div css={styles.inputContainer}>
          <p css={styles.inputLabel}>Unit price:</p>
          <input
            type="number"
            value={product.price}
            readOnly={true}
            placeholder="..."
            css={styles.input}
          />
        </div>
        <div css={styles.inputBorder}></div>
        <div css={styles.inputContainer}>
          <p css={styles.inputLabel}>Total price:</p>
          <input
            type="number"
            readOnly={true}
            value={smartContractData.totalPrice}
            placeholder="..."
            css={styles.input}
          />
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
                defaultValue={smartContractData.downPaymentPercent}
                onBlur={(e) =>
                  setSmartContractData({
                    ...smartContractData,
                    downPaymentPercent: e.target.value,
                    downPayment:
                      (smartContractData.totalPrice * Number(e.target.value)) /
                      100,
                  })
                }
              />
              <p css={{ color: '#BFBEBE', marginLeft: '10px' }}>%</p>
            </div>
            <input
              type="number"
              placeholder="..."
              css={styles.input}
              style={{ width: '100px' }}
              readOnly={true}
              value={smartContractData.downPayment}
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
                defaultValue={smartContractData.cashAgainstDocumentsPercent}
                onBlur={(e) =>
                  setSmartContractData({
                    ...smartContractData,
                    cashAgainstDocumentsPercent: e.target.value,
                    cashAgainstDocuments:
                      (smartContractData.totalPrice * Number(e.target.value)) /
                      100,
                  })
                }
              />
              <p css={{ color: '#BFBEBE', marginLeft: '10px' }}>%</p>
            </div>
            <input
              type="number"
              placeholder="..."
              css={styles.input}
              style={{ width: '100px' }}
              readOnly={true}
              value={smartContractData.cashAgainstDocuments}
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
                defaultValue={smartContractData.arrivalPercent}
                onBlur={(e) =>
                  setSmartContractData({
                    ...smartContractData,
                    arrivalPercent: e.target.value,
                    arrival:
                      (smartContractData.totalPrice * Number(e.target.value)) /
                      100,
                  })
                }
              />
              <p css={{ color: '#BFBEBE', marginLeft: '10px' }}>%</p>
            </div>
            <input
              type="number"
              placeholder="..."
              css={styles.input}
              style={{ width: '100px' }}
              readOnly={true}
              value={smartContractData.arrival}
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
                width: '100%',
              },
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
                width: '100%',
              },
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
                width: '100%',
              },
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
                width: '100%',
              },
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
              height: '160px',
            },
          }}
          defaultValue={smartContractData.description}
          onBlur={(e) =>
            setSmartContractData({
              ...smartContractData,
              description: e.target.value,
            })
          }
        ></textarea>

        <label
          htmlFor="attachFile"
          css={{
            display: 'flex',
            justifyContent: 'end',
            alignItems: 'center',
            margin: '20px 0',
            cursor: 'pointer',
          }}
        >
          <p
            css={{
              color: '#101010',
              fontSize: '15px',
              fontWeight: '400',
              marginRight: '10px',
            }}
          >
            {attachFile?.name}
          </p>
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
          <input
            type="file"
            style={{ display: 'none' }}
            name=""
            id="attachFile"
            onChange={(e) => setAttachFile(e.target.files && e.target.files[0])}
          />
        </label>
       
      </div>
    </div>
  )
  const Step6 = () => (
    <div css={styles.mainContent}>
      <div css={styles.leftContent}>
        <p css={styles.step}>Step 5)</p>
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
            {product.name}
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
            {product.availableSpecs}
          </p>
        </div>
        <div
          css={{ background: '#B1E080', height: '1px', width: '260px' }}
        ></div>
        {/* <div css={{ padding: '10px 0' }}>
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
        ></div> */}
        <div
          css={{
            padding: '10px 0',
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            flexWrap: 'wrap',
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
              {smartContractData.portOfLoadingInput +
                ', ' +
                smartContractData.portOfLoadingSelect}
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
              {smartContractData.portOfArrivalInput +
                ', ' +
                smartContractData.portOfArrivalSelect}
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
              {formatDate(smartContractData.departureDate)}
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
          {smartContractData.description}
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
        <div
          css={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            margin: '15px 0',
          }}
        >
          <div className="switch">
            <input
              type="checkbox"
              checked={brandType}
              onChange={(e) => setbrandType(e.target.checked)}
              hidden={true}
              id="username"
            />
            <label htmlFor="username"></label>
          </div>
          <p css={{ color: '#101010', fontSize: '20px', fontWeight: '400' }}>
            {brandType ? 'Branded' : 'Generic Brand'}
          </p>
        </div>
        <div
          css={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            margin: '15px 0',
          }}
        >
          <div className="switch">
            <input
              type="checkbox"
              checked={pluType}
              onChange={(e) => setpluType(e.target.checked)}
              hidden={true}
              id="username2"
            />
            <label htmlFor="username2"></label>
          </div>
          <p css={{ color: '#101010', fontSize: '20px', fontWeight: '400' }}>
            {pluType ? 'With PLU' : 'No PLU'}
          </p>
        </div>

        <div css={{ marginLeft: '30px' }}>
          <p css={{ marginTop: '20px' }}>
            <input
              type="checkbox"
              checked={measure}
              onChange={(e) => setmeasure(e.target.checked)}
              className="custom-checkbox"
              id="test20"
              name="radio-group"
            />
            <label
              htmlFor="test20"
              className="custom-label"
              css={{ color: '#000 !important', fontSize: '20px' }}
            >
              Measure CO2 (+$200)
            </label>
          </p>
          <div css={{border: certification ? '1px solid #3BA83B' : 0,
borderRadius: '10px',
background: certification ? '#fff' : 'none'}}>
          <p css={{ marginTop: '10px' }}>
            <input type="checkbox" className="custom-checkbox"  checked={certification}
                onChange={(e) => setcertification(e.target.checked)} id="test21" name="radio-group" />
            <label
              htmlFor="test21"
              className="custom-label"
              css={{ color: '#000 !important', fontSize: '20px' }}
            >
              Certifications
            </label>
          </p>

          <div css={{ marginLeft: '30px',visibility: certification ? 'visible' : 'hidden' }}>
            <p css={{ marginTop: '20px' }}>
              <input
                type="checkbox"
                checked={certificationData.includes("Global Gap (Grower level)")}
                onChange={(e) => handleCheckboxChange("Global Gap (Grower level)")}
                className="custom-checkbox"
                id="test201"
                name="radio-group"
              />
              <label
                htmlFor="test201"
                className="custom-label"
                css={{ color: '#000 !important', fontSize: '20px' }}
              >
                Global Gap (Grower level)
              </label>
            </p>
            <p css={{ marginTop: '20px' }}>
              <input
                type="checkbox"
                checked={certificationData.includes("Global Gap (Packhouse level)")}
                onChange={(e) => handleCheckboxChange("Global Gap (Packhouse level)")}
                className="custom-checkbox"
                id="test202"
                name="radio-group"
              />
              <label
                htmlFor="test202"
                className="custom-label"
                css={{ color: '#000 !important', fontSize: '20px' }}
              >
                Global Gap (Packhouse level)
              </label>
            </p>
            <p css={{ marginTop: '20px' }}>
              <input
                type="checkbox"
                checked={certificationData.includes("GRASP")}
                onChange={(e) => handleCheckboxChange("GRASP")}
                className="custom-checkbox"
                id="test203"
                name="radio-group"
              />
              <label
                htmlFor="test203"
                className="custom-label"
                css={{ color: '#000 !important', fontSize: '20px' }}
              >
                GRASP
              </label>
            </p>
            <p css={{ marginTop: '20px' }}>
              <input
              type='checkbox'
                checked={certificationData.includes("SMETA")}
                onChange={(e) => handleCheckboxChange("SMETA")}
                className="custom-checkbox"
                id="test204"
                name="radio-group"
              />
              <label
                htmlFor="test204"
                className="custom-label"
                css={{ color: '#000 !important', fontSize: '20px' }}
              >
                SMETA
              </label>
            </p>
            <p css={{ marginTop: '20px' }}>
              <input
                type="checkbox"
                checked={certificationData.includes("EU Organic")}
                onChange={(e) => handleCheckboxChange("EU Organic")}
                className="custom-checkbox"
                id="test205"
                name="radio-group"
              />
              <label
                htmlFor="test205"
                className="custom-label"
                css={{ color: '#000 !important', fontSize: '20px' }}
              >
                EU Organic
              </label>
            </p>
            <p css={{ marginTop: '20px' }}>
              <input
                type="checkbox"
                checked={certificationData.includes("US Organic")}
                onChange={(e) => handleCheckboxChange("US Organic")}
                className="custom-checkbox"
                id="test206"
                name="radio-group"
              />
              <label
                htmlFor="test206"
                className="custom-label"
                css={{ color: '#000 !important', fontSize: '20px' }}
              >
                US Organic
              </label>
            </p>
          </div>
          </div>
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

  const handleNextStep = async () => {
    if (showStep === 3) {
      if (!smartContractData.portOfLoadingInput) {
        return alert('Port of Loading is required')
      } else if (!smartContractData.portOfArrivalInput) {
        return alert('Port of Destination is required')
      } else if (!smartContractData.departureDate) {
        return alert('Date is required')
      }
    }
    if (showStep == 4) {
      if (!smartContractData.quantity) {
        return alert('Quantity is required')
      }
      if (!smartContractData.offerPrice) {
        return alert('Offer Price is required')
      }
      if (
        !smartContractData.downPayment &&
        smartContractData.downPayment !== 0
      ) {
        return alert('Down Payment is required')
      }
      if (
        !smartContractData.cashAgainstDocuments &&
        smartContractData.cashAgainstDocuments !== 0
      ) {
        return alert('Cash Against Documents Payment is required')
      }
      if (!smartContractData.arrival && smartContractData.arrival !== 0) {
        return alert('Arrival Payment is required')
      }
      const sumPercent = Number(smartContractData.downPaymentPercent) + Number(smartContractData.cashAgainstDocumentsPercent) + Number(smartContractData.arrivalPercent);
      if(sumPercent !== 100){

        return alert("The payment terms should be 100% now it have total "+sumPercent+"%")
      }
    }
    if (showStep == 5) {
      if (!smartContractData.description) {
        return alert('Description is required')
      }
    }
    if (showStep == 6) {
      setLoading(true)
      try {
        await submitSmartConData()
        setLoading(false)
        return setShowStep((pre) => pre + 1)
      } catch (error) {
        setLoading(false)
        return alert('Something went wrong please try again')
      }
    }
    return setShowStep((pre) => pre + 1)
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
            onClick={handleNextStep}
            disabled={loading}
            style={{ background: loading ? 'gray' : '#A8EFA8' }}
          >
            {loading ? 'Loading...' : showStep == 6 ? 'Submit' : 'Next Step'}
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
      paddingTop: '80px',
    },
  },
  prograssBarContainer: {
    background: '#3BA83B',
    height: '2px',
    width: '500px',
    position: 'relative',
    borderRadius: '1px',
    [`@media (max-width: ${theme.widths.tablet})`]: {
      width: '400px',
    },

    [`@media (max-width: ${theme.widths.tabletXs})`]: {
      width: '100%',
    },
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
      gap: '20px',
    },
  },
  leftContent: {},
  rightContent: {},
  buttons: {
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'center',
    margin: '70px 0 30px 0',
    gap: '10px',
    flexWrap: 'wrap',
    [`@media (max-width: ${theme.widths.tabletXs})`]: {
      justifyContent: 'center',
      marginTop: '30px',
    },
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
      fontSize: '22px',
    },
  },
  description: {
    fontSize: '15px',
    fontWeight: '400',
    color: '#101010',
    marginTop: '50px',
    width: '500px',
    [`@media (max-width: ${theme.widths.tabletXs})`]: {
      width: '100%',
      marginTop: '30px',
    },
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
      gridTemplateColumns: '1fr',
    },
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
      gridTemplateColumns: '1fr',
    },
  },
  inputLabel: {
    color: '#000',
    fontSize: '16px',
    fontWeight: '500',
    textAlign: 'right',
    [`@media (max-width: ${theme.widths.tablet})`]: {
      textAlign: 'left',
    },
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
      marginLeft: 0,
    },
  },
}))
