// ** React Imports
import { ReactNode } from 'react'

// ** Next Import
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType } from 'next/types'

// ** Third Party Imports
import axios from 'axios'

// ** Types
import { InvoiceType } from 'src/types/apps/invoiceTypes'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'
import PrintPage from 'src/views/e-commerce/order/print/PrintPage'

// import Router from 'next/router'

// ** Demo Components Imports

const OrderPrint = ({ id }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <PrintPage id={id}></PrintPage>
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const res = await axios.get(
      'http://alb-app1-2004556221.ap-southeast-1.elb.amazonaws.com:8080/order/2c9e80818e69d39b018e69d3d2ee0000'
    )
    const data: InvoiceType[] = await res.data

    const paths = data.map((item: InvoiceType) => ({
      params: { id: `${item.id}` }
    }))

    return {
      paths,
      fallback: true
    }
  } catch (error) {
    // alert('lỗi xảy ra ở trang [id] của print page')
    // Router.replace('/pages/misc/500-server-error')
  }

  return {
    paths: [],
    fallback: true
  }
}

export const getStaticProps: GetStaticProps = ({ params }: GetStaticPropsContext) => {
  return {
    props: {
      id: params?.id
    }
  }
}

OrderPrint.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

OrderPrint.setConfig = () => {
  return {
    mode: 'light'
  }
}

export default OrderPrint
