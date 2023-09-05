import {
  BaseProduct,
  Container,
  DetailedProduct,
  Faq,
  Footer,
  gql,
  graphqlReq,
  makeStyles,
  Navbar,
  NoSSR,
  PageBgColor,
  ProductInfo,
  ItemIntro,
  QuotePrompt,
  QuoteSticky,
  RelatedProducts,
  theme,
  faqs,
  SmartContractForm,
  useUser
} from 'common'
import { GetStaticPaths, GetStaticProps } from 'next'
import { FC, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

interface ProductPageProps {
  product: DetailedProduct
  relatedProducts: BaseProduct[]
  userProfile?: {
    fullName: string
    companyName: string
    email: string
    phone: string
  }
}

const ProductPage: FC<ProductPageProps> = (props) => {
  const { product, relatedProducts, userProfile } = props

 
  const [openQuote, setOpenQuote] = useState(false)
  const [containerRef, inView] = useInView()

  const [showSmartContract, setShowSmartContract] = useState(false);
  const [inViewState, setInViewState] = useState(true);

  useEffect(() => {
    setInViewState(inView)
  },[inView])

  const styles = useStyles(props);

  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }, [showSmartContract]);


  // const inputData = {
  //   productId: product._id,
  //   isExisting: false,
  //   portOfLoading:
  //     smartContractData.portOfLoadingInput +
  //     ', ' +
  //     smartContractData.portOfLoadingSelect,
  //   portOfArrival:
  //     smartContractData.portOfArrivalInput +
  //     ', ' +
  //     smartContractData.portOfArrivalSelect,
  //   departureDate: smartContractData.departureDate,
  //   offerPrice: Number(smartContractData.offerPrice),
  //   unit: 'kg',
  //   quantity: Number(smartContractData.quantity),
  //   downPayment: smartContractData.downPayment,
  //   cashAgainstDocuments: smartContractData.cashAgainstDocuments,
  //   arrival: smartContractData.arrival,
  //   description: { en: smartContractData.description, es: '' },
  //   brandType,
  //   pluType,
  //   measure,
  //   attachment: attachFileUrl && attachFileUrl.data[0],
  //   certifications: certificationData,
  // }

 const getContracs = gql`
  query {
    contracts(descCreatedAt: true) {
      _id
      description {
        en
      }
      productId
      portOfLoading
      portOfArrival
      departureDate
      offerPrice
      quantity
      downPayment
      cashAgainstDocuments
      arrival
      brandType
      pluType
      measure
      certifications
      updatedAt
      isExisting
    }
  }
  
  `;
 const getContracsDRAFT = gql`
  query {
    contracts(descCreatedAt: true, isExisting: true) {
      _id
      description {
        en
      }
      productId
      portOfLoading
      portOfArrival
      departureDate
      offerPrice
      quantity
      downPayment
      cashAgainstDocuments
      arrival
      brandType
      pluType
      measure
      certifications
      updatedAt
      isExisting
    }
  }
  
  `;
  const user = useUser()
  const [previousContract, setPreviousContract] = useState([]);
  const [previousContractDraft, setPreviousContractDraft] = useState([]);
  const getCon = async () => {
    const data1 = await graphqlReq(getContracs);
    console.log(data1)
    setPreviousContract(data1?.contracts)
  }
  const getConDraft = async () => {
    const data1 = await graphqlReq(getContracsDRAFT);
    console.log(data1)
    setPreviousContractDraft(data1?.contracts)
  }
  useEffect(() => {
  
    if(user?.role === "buyer"){

      getCon();
      getConDraft();
    }
  },[user])

  


  return (
    <>
    <div css={{
    fontFamily: theme.fonts.secondary,
    display: showSmartContract ? 'none' : 'block'
  }} >
      <PageBgColor bgColor="#fff" />
      <Navbar style={{ marginBottom: showSmartContract ? 0 : 40 }} />

   
        <Container style={{ marginBottom: 100 }} maxWidth="md">
          <ItemIntro
            style={{ marginBottom: 50 }}
            gallery={product.gallery}
            item={{ type: 'product', ...product }}
            onClickGetQuote={() => setOpenQuote(true)}
            buttonRef={containerRef}
            onShowSmartContract={() => setShowSmartContract(true)}
          />

          <ProductInfo product={product} />
        </Container>

        <RelatedProducts
          products={relatedProducts}
          style={{ marginBottom: 122, marginTop: 120 }}
        />

        <Container style={{ marginBottom: 100 }} maxWidth="sm">
          <Faq faqs={faqs.dealProductFaqs} />
        </Container>
  
   

      <Footer />

      <NoSSR>
        <div css={{ display: openQuote ? undefined : 'none' }}>
          <QuotePrompt
            product={product}
            onClose={() => setOpenQuote(false)}
            userProfile={userProfile}
          />
        </div>
      </NoSSR>
      {!inViewState && !showSmartContract ? (
        <QuoteSticky setInViewState={() => setInViewState(true)} onClickGetQuote={() => setOpenQuote(true)} />
      ) : null}
    </div>
       <div
       css={{
         background: '#F8F8F8',
height: showSmartContract ? '100vh' : '0',
transition: '.5s',
position:'absolute',
bottom:'0',
zIndex:9999,
width: '100%',
visibility: showSmartContract ? 'visible' : 'hidden',
overflow:'auto'
       }}
     >
       
       <SmartContractForm getConDraft={getConDraft} getCon={getCon} previousContractDraft={previousContractDraft} previousContract={previousContract} product={product} handelClose={() => setShowSmartContract(false)} />
     </div>
     </>
  )
}

const useStyles = makeStyles((props: ProductPageProps) => ({
 
}))

const GET_DATA = gql`
  query ($productId: String!) {
    product(_id: $productId) {
      _id
      name {
        en
      }
      thumbnail
      country
      price
      categoryId
      description {
        en
      }
      offerPrices {
        name {
          en
        }

        value {
          en
        }
      }
      availableSpecs {
        en
      }
      hsCode {
        en
      }
      harvestingMonths
      gallery
      traces {
        title {
          en
          es
        }
        gallery
        description {
          en
        }
      }
      updatedAt

      category {
        products {
          _id
          name {
            en
          }
          thumbnail
          country
          price
          categoryId
          availableSpecs {
            en
          }
        }
      }
    }
  }
`

export const getStaticProps: GetStaticProps<ProductPageProps> = async (ctx) => {
  const productId = ctx.params?.productId as string

  const { product } = await graphqlReq(GET_DATA, { productId })

  if (!product) {
    return {
      notFound: true,
      revalidate: 60,
    }
  }

  return {
    props: {
      product: {
        ...product,
        name: product.name.en,
        description: product.description.en,
        availableSpecs: product.availableSpecs.en,
        hsCode: product.hsCode.en,
        traces: product.traces.map((trace: any) => ({
          ...trace,
          title: trace.title.en,
          description: trace.description.en,
        })),
        offerPrices: product.offerPrices.map((offerPrice: any) => ({
          ...offerPrice,
          name: offerPrice.name.en,
          value: offerPrice.value.en,
        })),
      },
      relatedProducts: product.category.products
        .filter((p: any) => p._id !== product._id)
        .map((product: any) => ({
          ...product,
          name: product.name.en,
          availableSpecs: product.availableSpecs.en,
        })),
    },
    revalidate: 60,
  }
}

const GET_PRODUCTS = gql`
  query {
    products {
      _id
    }
  }
`

export const getStaticPaths: GetStaticPaths = async () => {
  const { products } = await graphqlReq(GET_PRODUCTS)

  const paths = products.map((product: any) => ({
    params: { productId: product._id },
  }))

  return {
    paths: paths,
    fallback: 'blocking',
  }
}

export default ProductPage
