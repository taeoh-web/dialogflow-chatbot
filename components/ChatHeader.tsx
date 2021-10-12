import React, { ReactNode } from 'react'
import styles from '../styles/Layout.module.css'

type Props = {
  children?: ReactNode
  title?: string
}

const ChatHeader = ({ children, title = 'Gentle Bot' }: Props) => (
  <header className={styles['bot-header']}>
  <h1>{title}</h1>
  </header>
)

export default ChatHeader
