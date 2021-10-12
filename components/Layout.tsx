import React, { ReactNode } from 'react'
import Head from 'next/head'
import styles from '../styles/Layout.module.css'

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title }: Props) => (
    <>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <main className={styles['bot-container']}>
        {children}
    </main>
    </>
)

export default Layout




      